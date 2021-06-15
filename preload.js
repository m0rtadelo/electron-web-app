const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron')

let holder;
ipcRenderer.on('message', (event, arg) => { 
  if (event && arg && holder) {
    holder(arg);
  }
})
contextBridge.exposeInMainWorld('api', {
  electron: true,
  post: async (data) => await ipcRenderer.invoke('post', data),
  put: async (data) => await ipcRenderer.invoke('put', data),
  delete: async (data) => await ipcRenderer.invoke('delete', data),
  patch: async (data) => await ipcRenderer.invoke('patch', data),
  message: function (func) {
    holder = func
    if (func) {
      ipcRenderer.send('message', 'on');
    }
  },
  sendMessage: (data) => {
    ipcRenderer.send('message', data);
  },
});

