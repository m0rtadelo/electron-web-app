const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron')
const { Toast } = require('bootstrap');
//  import bootstrap from './client/assets/js/bootstrap';

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
  showToast: (id) => {
    const element = document.getElementById(id);
    const toast = new Toast(document.getElementById(id));
    toasts.push(id);
    element.addEventListener('hidden.bs.toast', () => {
      document.getElementById(id).innerHTML='';
      let exists = false;
      toasts.forEach((tid) => {
        if (document.getElementById(tid).innerText !== '') {
          exists = true;
        }
      });
      if (!exists) {
        toasts = [];
        document.getElementById('toasts').innerHTML = '';
      }
    });
    toast.show();  
  }
});

