import '../assets/css/bootstrap.min.css';
import { UI } from './utils/ui';
const ui = new UI();
interface IResponse {
  status: number;
  data?: any;
  error?: any;
}

window.onload = async function() {
    ui.get('loginForm').addEventListener('submit',async (event: any) => { event.preventDefault(); void await onSubmit() });
};

function showError({status, error, data}: IResponse) {
    const show = status !== 200;
    ui.get('error-div').style =  show ? 'margin-top: 1em;' : 'display: none;'
    ui.get('status').innerHTML = status;
    ui.get('error').innerHTML = status === 401 ? 'Invalid Credentials' : error || data?.error || 'Unknown error';
    if (!show) {
        ui.get("login").style = "display:none;"
        ui.get("app").style = ""
    }
}

const onSubmit = async () => {
    const data = ui.getFormData();
    const result = await (window as any).api.post({
        action: 'login',
        data
    });
    showError(result);
}
