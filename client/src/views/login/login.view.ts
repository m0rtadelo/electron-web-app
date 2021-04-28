import { get, getFormData, addEventListener } from "../../utils/ui";
import { IResponse } from "../../interfaces/response.interface";
import { LoginService } from "./login.service";
import { View } from "../view";
import { LOGIN_HTML } from "./login.html";

export class LoginView extends View {
    public data: any;

    constructor() {
        super(LOGIN_HTML, new LoginService());
        setTimeout(() => {
            addEventListener('loginForm', 'submit', this.onSubmit);
            get('user').focus();
        }, 1);
    }
    
    public onSubmit = async () => {
        this.data = await this.service.query(getFormData());
    }
    
}