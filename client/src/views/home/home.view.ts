import { View } from "../../core";
import { addEventListener } from "../../core/utils/ui";
import { LoginView } from "../login/login.view";
import { HOME_HTML } from "./home.html";
import { MenuComponent, TableDateComponent } from "../../components";

export class HomeView extends View {
  public users = [{id: 5, name: 'Pol', admin: false}, {id: 1, name: 'Ricard', admin: true}];
  public other: any = [];
  constructor(data?: any) {
    super(HOME_HTML, [new MenuComponent(), new TableDateComponent()], data);
    this.loading = true;
    addEventListener("form", "submit", () => {
      new LoginView();
    });
    this.loading  = false;
  }
}
