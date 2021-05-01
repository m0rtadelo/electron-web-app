if (!(window.api && window.api.electron)) {
  const doFetch = async (method, data, url) =>
    await fetch(url, {
      method,
      mode: "cors",
      credentials: "same-origin",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(data),
    });
  const execute = async (verb, data, url = "/api") => {
    try {
      const response = await doFetch(verb, data, url);
      return { status: response.status, data: await response.json() };
    } catch (error) {
      return { status: 500, error };
    }
  };
  window.api = {
    get: async () => {
      return await execute("GET");
    },
    post: async (data) => {
      return await execute("POST", data);
    },
    delete: async (data) => {
      return await execute("DELETE", data);
    },
    put: async (data) => {
      return await execute("PUT", data);
    },
    patch: async (data) => {
      return await execute("PATCH", data);
    },
  };
}
/*
window.values = {
  model: {},
  add: (variableName, data, element) => {
    if (element) {
      element.parentElement.setAttribute(variableName, data);
    } else {
      window.values.model[variableName] = data;
    }
  },
  get: (variableName, element) => {
    if (element) {
      return element.parentElement.getAttribute(variableName);
    } else {
      return window.values.model[variableName] || undefined;
    }
  },
};
*/
