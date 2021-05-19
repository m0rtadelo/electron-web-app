const {app, BrowserWindow} = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
const { handlePost, handlePut, handleDelete, handlePatch, handleMessage } = require('./server/dist/handler');

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

  ipcMain.handle('post', async (event, data) => {
    return await handlePost(data);
  })

  ipcMain.handle('put', async (event, data) => {
    return await handlePut(data);
  })

  ipcMain.handle('delete', async (event, data) => {
    return await handleDelete(data);
  })

  ipcMain.handle('patch', async (event, data) => {
    const result = await handlePatch(data);
    if (result.status) {
      ipcMain.invoke('message', { verb: 'patch', data: result, action: result.data.action } )
    }
  })

  ipcMain.handle('message', async (event, data) => {
    return await handleMessage(data);
  })

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})