import '../assets/css/bootstrap.min.css';
import { get, getFormData, addEventListener } from './utils/ui';
import { IResponse } from './interfaces/response.interface';

window.onload = function() {
    addEventListener('loginForm', 'submit', onSubmit);
};

function showResult({status, error, data}: IResponse) {
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
    const data = getFormData();
    const result = await (window as any).api.post({
        action: 'login',
        data
    });
    showResult(result);
}
