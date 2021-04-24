const get = (id) => document.getElementById(id);
//const get = require('./elements').get;
window.onload = async function() {
    get('loginForm').addEventListener('submit',async (event) => { event.preventDefault(); void await onSubmit(event) });
};

function showError({status, error, data}) {
    const show = status !== 200;
    get('error-div').style =  show ? 'margin-top: 1em;' : 'display: none;'
    get('status').innerHTML = status;
    get('error').innerHTML = status === 401 ? 'Invalid Credentials' : error || data?.error || 'Unknown error';
    if (!show) {
        get("login").style = "display:none;"
        get("app").style = ""
    }
}

const onSubmit = async () => {
    const inputFields = document.getElementsByTagName('input')
    let data = {}
    for(let i=0; i<inputFields.length; i++) {
        const id = inputFields[i].id;
        const htmlItem = get(id);
        if (htmlItem) {
            const elem = {}
            elem[id] = htmlItem.value
            data = { ...data, ...elem };
        }
    }
    const result = await window.api.post({
        action: 'login',
        data
    });
    showError(result);
}
