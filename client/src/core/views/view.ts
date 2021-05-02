import { get, addListeners } from "../utils/ui";
import { Service } from "../services/service";
import { Component } from "../components/component";
import { deepCopy } from "../utils/obj";
import { APP_NODE, ID, DATA_KEY, MODAL_HTML, REQUIRED_HTML, TAG_KEY } from "./view.constants";

export class View {
  protected service: Service;
  public loading = false;
  public activeComponents: Array<Component> = [];
  public model: any;
  public static active: View;
  private _res: any;
  private view: string;
  private components: Array<Component>;

  constructor(view: string, components?: Array<Component>, data?: any, service?: Service, isModal?: boolean) {
    this.view = view;
    this.components = components;
    this.runCode.bind(this);
    this.model = data || this.model;
    if (isModal) {
    } else {
      get(APP_NODE).innerHTML = REQUIRED_HTML.concat(view);
      addListeners(get(APP_NODE), false, this);
      this.addComponents(components);
    }
    this.service = service;
    View.active = this;
    this.onReady();
  }

  public addComponents(components: Array<Component>, baseNode = document) {
    components?.forEach((component) => {
      const domElements = baseNode.getElementsByTagName(component.selector);
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

  public confirm(msg: string, title?: string): Promise<boolean> {
    get(TAG_KEY).innerHTML = MODAL_HTML.replace('$msg', msg).replace('$title', title || 'Confirm');
    addListeners(get(TAG_KEY), false, this);
    return new Promise((res) => {
      get("openModal").click();
      this._res = res;
    })
  }

  public openModal(view: View, title?: string): Promise<any> {
    get(TAG_KEY).innerHTML = MODAL_HTML.replace('$title', title || 'Modal');
    get("modal-body").innerHTML = view.view;
    addListeners(get(TAG_KEY), false, this);
    this.addComponents(view.components, get("modal-body"));
    return new Promise((res) => {
      get("openModal").click();
      this._res = res;
    })

  }

  public confirmCancel() {
    this._res(false);
  }

  public confirmConfirm() {
    this._res(true);
  }

  public onReady() {}

  public onChanges() {}
  
  public emmit(data: any) {}

  private runCode(code: string) {
    eval(code);
  }

}
