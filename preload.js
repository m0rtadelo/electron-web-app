const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
  electron: true,
  post: async (data) => await ipcRenderer.invoke('post', data),
  put: async (data) => await ipcRenderer.invoke('put', data),
  delete: async (data) => await ipcRenderer.invoke('delete', data),
  patch: async (data) => await ipcRenderer.invoke('patch', data),
});

