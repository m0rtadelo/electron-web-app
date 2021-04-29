import { get } from "../utils/ui";
import { Service } from "./service";
import { Component } from "../components/component";
import { BannerErrorComponent, LoginComponent } from "../components";
import { MenuComponent } from "../components/menu.component";
import { DateHourComponent } from "../components/date-hour.component";
import { cloneable } from "../utils/obj";
import { AppTypeComponent } from "../components/app-type.component";

export class View {
  protected service: Service;
  public components: Array<Component> = [
    new BannerErrorComponent(),
    new LoginComponent(),
    new MenuComponent(),
    new DateHourComponent(),
    new AppTypeComponent(),
  ];
  public loading = false;
  
  public data: any;

  constructor(view: string, data?: any, service?: Service) {
    this.data = data || this.data;
    get("root").innerHTML = view;
    this.service = service;
    this.addComponents();
    this.onReady();
  }

  public addComponents() {
    const clon = new cloneable();
    // let hasComponents = true;
    // const added = new Map();
    // while(hasComponents) {
    //   hasComponents = false;
      this.components?.forEach((component) => {
        // if(!added.has(component.selector)) {
          const domElements = document.getElementsByTagName(component.selector);
          for (var i = 0; i < domElements.length; i++) {
            const element = domElements[i];
            const clon: Component = cloneable.deepCopy(component);
            clon.enable();
            if (element.getAttribute('color')) {
              debugger;
            }
            clon.render(this, element, element.getAttribute('data'));
            // hasComponents = true;
            // added.set(component.selector, true);
          }
        // }
      });
    // }
  }

  public onReady() {}

  public onSubmit() {}
}
