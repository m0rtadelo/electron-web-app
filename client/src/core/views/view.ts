import { get, addListeners } from "../utils/ui";
import { Service } from "../services/service";
import { Component } from "../components/component";
import { BannerErrorComponent, LoginComponent, TableDateComponent } from "../../components";
import { MenuComponent } from "../../components/menu/menu.component";
import { DateHourComponent } from "../../components/date-hour/date-hour.component";
import { AppTypeComponent } from "../../components/app-type/app-type.component";
import { deepCopy } from "../utils/obj";
import { APP_NODE, ID, DATA_KEY } from "./view.constants";

export class View {
  protected service: Service;
  //public components: Array<Component> = [];
  public loading = false;
  public activeComponents: Array<Component> = [];
  public model: any;
  public static active: View;

  constructor(view: string, components?: Array<Component>, data?: any, service?: Service) {
    this.runCode.bind(this);
    this.model = data || this.model;
    get(APP_NODE).innerHTML = view;
    this.service = service;
    addListeners(get(APP_NODE), false, this);
    this.addComponents(components);
    View.active = this;
    this.onReady();
  }

  public addComponents(components: Array<Component>) {
    components?.forEach((component) => {
      const domElements = document.getElementsByTagName(component.selector);
      for (var i = 0; i < domElements.length; i++) {
        const element = domElements[i];
        const clon: Component = deepCopy(component);
        this.activeComponents.push(clon);
        clon.enable();
        const actualId = element.getAttribute(ID);
        if (actualId) {
          clon.idComponent = actualId;
        } else {
          element.setAttribute(ID, clon.idComponent);
        }
        let elementData = element.getAttribute(DATA_KEY);
        clon.render(this, element, elementData);
      }
    });
  }

  public getComponentById(id: string) {
    return this.activeComponents.find(cmp => cmp.idComponent === id);
  }

  public getActiveComponent() {
    return Component.active;
  }

  public getEventComponent() {
    return Component.event;
  }

  public injectEvent(element: HTMLElement, eventType: string, code: string) {
    element.addEventListener(eventType, (() => { this.runCode(code)}));
   }

  public onReady() {}

  public onChanges() {}
  
  public emmit(data: any) {}

  private runCode(code: string) {
    eval(code);
  }

}
