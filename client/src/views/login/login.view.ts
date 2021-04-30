import { get, getFormData, addEventListener } from "../../core/utils/ui";
import { LoginService } from "./login.service";
import { LOGIN_HTML } from "./login.html";
import { HomeView } from "../home/home.view";
import { View } from "../../core";

export class LoginView extends View {
  public testData = "surprise";

  constructor(data?: any) {
    super(LOGIN_HTML, data, new LoginService());
  }

  public onReady() { 
    get("user").focus();
    addEventListener("change", "click", this.click.bind(this))
    setTimeout(() => {
      // this.model = { status: 200, data: {user: 'a', id: 5 }};  // autologin
      // this.testData = "changed from view (model change)";
      // this.getComponentById("change").setData({ status: 200, data: {user: 'a', id: 5 }}); // autologin changing view model ref. from component data
    },2000)
  }
  
  public emmit = async () => {
    this.loading = true;
    this.model = await this.service.query(getFormData());
    this.loading = false;
  };

  public onChanges() {
    if (View.active === this) {
      this.checkSuccessResponse();
    }
  }

  private checkSuccessResponse() {
    if (this.model?.status === 200 && this.model?.data?.id) {
      new HomeView(this.model.data);
    }
  }

  private click() {
    console.log('this', this);
    this.testData = 'new surprise';
  }
}
