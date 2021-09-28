const {app, BrowserWindow} = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
const Files = require('./src/utils/files')
const Config = require('./src/services/config')
const s3 = require('@auth0/s3');
const createClient = (data) => (s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: data.accessKeyId,
    secretAccessKey: data.secretAccessKey,
    region: data.region,
    // endpoint: 's3.yourdomain.com',
    // sslEnabled: false
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },      
}))
function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 780,
    minHeight: 500,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('client/dist/index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
/*
  ipcMain.handle('post', async (event, data) => {
    return await handlePost(data);
  })

  ipcMain.handle('login', async (event, data) => {
    return await handleLogin({ body: data });
  })

  ipcMain.handle('put', async (event, data) => {
    return await handlePut(data);
  })

  ipcMain.handle('delete', async (event, data) => {
    return await handleDelete(data);
  })
*/
  ipcMain.handle('init', async (event, data) => {
    Config.loadDataFromFile();
    return Config.data;
  })

  ipcMain.handle('saveConfig', async (event, data) => {
    Config.data = data
    Config.saveDataToFile();
    return true;
  })

  ipcMain.on('message', async (event, data) => {
    if (event && data === 'on') {
      event.reply('message', { data: 'on' })
    }
    if (event && data.action === 'loadLocal') {
      try {
        const result = await Files.list(data.bucket.localPath)
        event.reply('message', { action: 'loadLocal', data: result })
      } catch (error) {
        event.reply('message', { action: 'loadLocal', error })
      }
    }
    if (event && data.action === 'loadRemote') {
      const client = createClient(data.bucket)
      const list = client.listObjects( { s3Params: { Bucket: data.bucket.bucket }})
      list.on('data', (data) => {
        event.reply('message', { action: 'loadRemote', data })
      })
      list.on('error', (err) => {
        event.reply('message', { action: 'loadRemote', error: err })
      })
      list.on('end', () => {
        event.reply('message', { action: 'loadRemote', end: true })
      })
    }
    if (event && data?.action === 'check') {
      const client = createClient(data.data)
      const list = client.listObjects({ s3Params: { MaxKeys: 1, Bucket: data.data.bucket } })
      list.on('error', (err) => {
        event.reply('message', { action: 'check', data: err });
      })
      list.on('end', () => {
        event.reply('message', { action: 'check', data: true });
      })
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})