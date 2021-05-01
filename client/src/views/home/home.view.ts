import { View } from "../../core";
import { addEventListener } from "../../core/utils/ui";
import { LoginView } from "../login/login.view";
import { HOME_HTML } from "./home.html";

export class HomeView extends View {
  public users: any = [];
  constructor(data?: any) {
    super(HOME_HTML, data);
    addEventListener("form", "submit", () => {
      new LoginView();
    });
  }
}
