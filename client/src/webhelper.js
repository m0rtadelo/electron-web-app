if (!(window.api && window.api.electron)) {
    console.log('run in a browser, inject req. methods...');
    const fM = async (method, data, url) => await fetch(url, {
        method,
        mode: 'cors',
        credentials: 'same-origin',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(data)
    })
    const exec = async (verb, data, url = '/api') => {
        try {
            const response = await fM(verb, data, url);
            return { status: response.status, data: await response.json() };
        } catch (error) {
            return { status: 500, error }
        }
    }
    window.api = {
        get: async () => { return await exec('GET') },
        post: async (data) => { return await exec('POST', data) },
        post_: async (data) => {
            try {
                const response = await fM('POST', data, '/api');
                return { status: response.status, data: await response.json() };
            } catch (error) {
                return { status: 500, error }
            }            
        }
    }
} else {
    console.log('run in electron');
}