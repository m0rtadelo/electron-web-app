import { get, getFormData } from "../../utils/ui";
import { LoginService } from "./login.service";
import { View } from "../view";
import { LOGIN_HTML } from "./login.html";
import { HomeView } from "../home/home.view";

export class LoginView extends View {
  public testData = "surprise";

  constructor(data?: any) {
    super(LOGIN_HTML, data, new LoginService());
  }

  public onReady() { 
    get("user").focus();
    setTimeout(() => {
      this.testData = "changed from view (model change)";
      this.getComponentById("change").setData({ status: 200, data: {user: 'a', id: 5 }});
    },2000)
  }
  
  public emmit = async () => {
    this.loading = true;
    this.model = await this.service.query(getFormData());
    this.testData = this.model.status;
    this.loading = false;
    this.checkSuccessResponse();
  };

  public onChanges() {
    this.checkSuccessResponse();
  }

  private checkSuccessResponse() {
    if (this.model?.status === 200 && this.model?.data?.id) {
      new HomeView(this.model.data);
    }
  }
}
