if (!(window.api && window.api.electron)) {
  let socket;
  try {
    socket = new WebSocket('ws://localhost:4500/ws');
  } catch (error) {
    console.error(error);
  }
  let emitter;
  socket.addEventListener('message', (event) => {
    if (emitter) {
      emitter(JSON.parse(event.data));
    }
  }, false);

  const doFetch = async (method, data, url) =>
    await fetch(url, {
      method,
      mode: 'cors',
      credentials: 'same-origin',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(data),
    });
  const execute = async (verb, data, url = '/api') => {
    let response;
    try {
      response = await doFetch(verb, data, url);
    } catch (error) {
      return { status: 500, error };
    }
    try {
      return { status: response.status, data: await response.json() };
    } catch (error) {
      return { status: response.status, data: { error: response.statusText } };
    }
  };
  window.api = {
    get: async () => {
      return await execute('GET');
    },
    post: async (data) => {
      return await execute('POST', data);
    },
    delete: async (data) => {
      return await execute('DELETE', data);
    },
    put: async (data) => {
      return await execute('PUT', data);
    },
    patch: async (data) => {
      return await execute('PATCH', data);
    },
    message: (cb) => {
      emitter = cb;
    },
    sendMessage: (message) => {
      socket.send(message);
    },
  };
}
let toasts = [];
window.api.showToast = (id) => {
  const element = document.getElementById(id);
  const toast = new bootstrap.Toast(document.getElementById(id));
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
};
