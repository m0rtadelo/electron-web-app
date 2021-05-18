//import { Websocket } from './core/services/websocket';

if (!(window.api && window.api.electron)) {
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
      const socket = new WebSocket('ws://localhost:4500');
      socket.addEventListener('message', (event) => {
        cb(JSON.parse(event.data));
      });
    },
  };
}
