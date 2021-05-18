const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
  electron: true,
  post: async (data) => await ipcRenderer.invoke('post', data),
  put: async (data) => await ipcRenderer.invoke('put', data),
  delete: async (data) => await ipcRenderer.invoke('delete', data),
  patch: async (data) => await ipcRenderer.invoke('patch', data),
  handle: (data) => ipcRenderer.invoke('message', data),
  message: (func) => ipcRenderer.on('message', (event, arg) => { func(arg) })
  //socket: (sender, listener) => new Websocket('ws://localhost:4500', (data) => listener(data))
});

