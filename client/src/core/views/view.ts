import { get } from "../utils/ui";
import { Service } from "../services/service";
import { Component } from "../components/component";
import { BannerErrorComponent, LoginComponent } from "../../components";
import { MenuComponent } from "../../components/menu/menu.component";
import { DateHourComponent } from "../../components/date-hour/date-hour.component";
import { AppTypeComponent } from "../../components/app-type/app-type.component";
import { deepCopy } from "../utils/obj";

export class View {
  protected service: Service;
  private components: Array<Component> = [
    new BannerErrorComponent(),
    new LoginComponent(),
    new MenuComponent(),
    new DateHourComponent(),
    new AppTypeComponent(),
  ];
  public loading = false;
  public activeComponents: Array<Component> = [];
  public model: any;
  public static active: View;

  constructor(view: string, data?: any, service?: Service) {
    this.model = data || this.model;
    get("root").innerHTML = view;
    this.service = service;
    this.addComponents();
    View.active = this;
    this.onReady();
  }

  public addComponents() {
    this.components?.forEach((component) => {
      const domElements = document.getElementsByTagName(component.selector);
      for (var i = 0; i < domElements.length; i++) {
        const element = domElements[i];
        const clon: Component = deepCopy(component);
        this.activeComponents.push(clon);
        clon.enable();
        const actualId = element.getAttribute("id");
        if (actualId) {
          clon.idComponent = actualId;
        } else {
          element.setAttribute("id", clon.idComponent);
        }
        let elementData = element.getAttribute("data");
        clon.render(this, element, elementData);
      }
    });
  }

  public getComponentById(id: string) {
    return this.activeComponents.find(cmp => cmp.idComponent === id);
  }

  public getActive() {
    return Component.active;
  }

  public onReady() {}

  public onChanges() {}
  
  public emmit(data: any) {}
}
