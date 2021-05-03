import { View } from "../../core";
import { addEventListener } from "../../core/utils/ui";
import { LoginView } from "../login/login.view";
import { HOME_HTML } from "./home.html";
import { MenuComponent, TableDateComponent } from "../../components";
import { AddModalView } from "../../components/table-data/add-modal.view";

export class HomeView extends View {
  public users: any = [{ id: 5, name: 'Pol', admin: false }, { id: 1, name: 'Ricard', admin: true }];
  public contacts: any = [];
  constructor(data?: any) {
    super(HOME_HTML, [new MenuComponent(), new TableDateComponent()], data);
    this.loading = true;
    addEventListener("form", "submit", () => {
      new LoginView();
    });
    this.loading = false;
  }

  public async emmit(data: any) {
    if (data.action === "add") {
      const result = await this.openModal(new AddModalView(data.data), "Contacts");
      if (result) {
        if (result.name && result.type && result.phone) {
          console.log(result);
          this.contacts.push(result);
        } else {
          data.data = result;
          void await this.emmit(data);
        }
      }
    }
  }

}
