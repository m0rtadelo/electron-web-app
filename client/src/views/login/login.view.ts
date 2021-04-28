import { get, getFormData } from "../../utils/ui";
import { LoginService } from "./login.service";
import { View } from "../view";
import { LOGIN_HTML } from "./login.html";
import { HomeView } from "../home/home.view";

export class LoginView extends View {

    constructor(data?: any) {
        super(LOGIN_HTML, data, new LoginService());
    }
    
    public onReady() {
      get('user').focus();
    }
  
    public onSubmit = async () => {
      this.loading = true;
      this.data = await this.service.query(getFormData());
      if (this.data?.status === 200 && this.data?.data?.id) {
        new HomeView(this.data.data);
      }
      this.loading = false;
    }
    
}