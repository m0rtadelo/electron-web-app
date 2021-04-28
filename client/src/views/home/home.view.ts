import { addEventListener } from "../../utils/ui";
import { LoginView } from "../login/login.view";
import { View } from "../view";
import { HOME_HTML } from "./home.html";

export class HomeView extends View {
  constructor(data?: any) {
    super(HOME_HTML, data);
    addEventListener("form", "submit", () => {
      new LoginView();
    });
  }
}
