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

  constructor(view: string, data?: any, service?: Service) {
    this.model = data || this.model;
    get("root").innerHTML = view;
    this.service = service;
    this.addComponents();
    this.onReady();
  }

  public addComponents() {
    const clon = new cloneable();
    this.components?.forEach((component) => {
      const domElements = document.getElementsByTagName(component.selector);
      for (var i = 0; i < domElements.length; i++) {
        const element = domElements[i];
        const clon: Component = cloneable.deepCopy(component);
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

  public onReady() {}

  public onChanges() {}
  
  public emmit(data: any) {}
}
