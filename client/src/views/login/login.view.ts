import { get, getFormData, addEventListener } from "../../utils/ui";
import { IResponse } from "../../interfaces/response.interface";
import { LoginService } from "./login.service";
import { View } from "../view";
import { LOGIN_HTML } from "./login.html";

export class LoginView extends View {

    constructor() {
        super(LOGIN_HTML, new LoginService());
        setTimeout(() => {
            addEventListener('loginForm', 'submit', this.onSubmit);
            get('user').focus();
        }, 1);
    }

    public showResult({status, error, data}: IResponse): void {
        const showError = status !== 200;
        get('error-div').style =  showError ? 'margin-top: 1em;' : 'display: none;'
        get('status').innerHTML = status;
        get('error').innerHTML = status === 401 ? 'Invalid Credentials' : error || data?.error || 'Unknown error';
        if (!showError) {
            this.service.goHome();
        }
    }
    
    public onSubmit = async () => {
        const result = await this.service.query(getFormData());
        this.showResult(result);
    }
    
}