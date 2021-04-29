import { get, getFormData } from "../../utils/ui";
import { LoginService } from "./login.service";
import { View } from "../view";
import { LOGIN_HTML } from "./login.html";
import { HomeView } from "../home/home.view";

export class LoginView extends View {
  public testData: any; // = "surprise";

  constructor(data?: any) {
    super(LOGIN_HTML, data, new LoginService());
  }

  public onReady() {
    get("user").focus();
  }
  
  public onSubmit = async () => {
    this.loading = true;
    this.data = await this.service.query(getFormData());
    this.testData = this.data.status;
    this.loading = false;
    this.checkSuccessResponse();
  };

  private checkSuccessResponse() {
    if (this.data?.status === 200 && this.data?.data?.id) {
      new HomeView(this.data.data);
    }
  }
}
