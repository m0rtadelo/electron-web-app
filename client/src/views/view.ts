import { get } from "../utils/ui";
import { Service } from "./service";
import { BannerErrorComponent } from "../components";
import { LoginComponent } from '../components';
import { MenuComponent } from "../components/menu.component";
export class View {
  protected service: Service;
  protected loading = false;
  
  private components = [new BannerErrorComponent(), new LoginComponent(), new MenuComponent()];
  public data: any;

  constructor(view: string, data?: any, service?: Service) {
    this.data = data || this.data;
    get("root").innerHTML = view;
    this.service = service;
    this.addComponents();
    this.onReady();
  }

  public addComponents() {
    this.components.forEach((component) => {
      const domElements = document.getElementsByTagName(component.selector);
      for (var i = 0; i < domElements.length; i++) {
        component.render(this, domElements[i]);
      }
    });
  }

  public onReady() {}
}
