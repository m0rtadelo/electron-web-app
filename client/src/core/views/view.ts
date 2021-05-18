import Notiflix from 'notiflix';
import { get, addListeners } from '../utils/ui';
import { Service } from '../services/service';
import { Component } from '../components/component';
import { deepCopy } from '../utils/obj';
import { APP_NODE, ID, DATA_KEY, MODAL_HTML, REQUIRED_HTML, TAG_KEY } from './view.constants';
import { INTERVAL } from '../constants';

export class View {
  protected service: Service;
  public loading = false;
  public activeComponents: Array<Component> = [];
  public model: any;
  public static active: View;
  private static _res: any;
  private view: string;
  private components: Array<Component>;
  private lastNotify = 0;

  constructor(view: string, components?: Array<Component>, data?: any, service?: Service, isModal?: boolean) {
    this.loading = true;
    this.view = view;
    this.components = components;
    this.runCode.bind(this);
    this.model = data || this.model;
    if (!isModal) {
      get(APP_NODE).innerHTML = REQUIRED_HTML.concat(view);
      addListeners(get(APP_NODE), false, this);
      this.addComponents(components);
    }
    this.service = service;
    if (View.active && !isModal) {
      View.active.activeComponents.forEach((comp) => {
        comp.destroy();
      });
    }
    View.active = this;
    this.loading = false;
    setTimeout(() => {
      this.onReady();
    }, INTERVAL);
    Notiflix.Notify.init({
      position: 'center-bottom',
      width: '30em',
      fontSize: '1em',
      cssAnimationStyle: 'from-bottom',
      timeout: 6000,
    });
    (window as any).api.message((data) => {
      this.message(data);
    });
  }

  /**
   * Checks and creates components on the baseNode binding events to the context
   * @param {Array<Component>} components components required to render this view
   * @param {any} baseNode related HTML node element
   * @param {View} context events binds to this context
   */
  public addComponents(components: Array<Component>, baseNode = document, context: View = this): void {
    components?.forEach((component) => {
      const domElements = baseNode.getElementsByTagName(component.selector);
      for (let i = 0; i < domElements.length; i++) {
        const element = domElements[i];
        const clon: Component = deepCopy(component);
        context.activeComponents.push(clon);
        clon.enable();
        const actualId = element.getAttribute(ID);
        if (actualId) {
          clon.idComponent = actualId;
        } else {
          element.setAttribute(ID, clon.idComponent);
        }
        const elementData = element.getAttribute(DATA_KEY);
        clon.render(context, element, elementData);
      }
    });
  }
  /**
   * Returns the component by id
   * @param {string} id the component id
   * @return {Component} the component
   */
  public getComponentById(id: string) {
    return this.activeComponents.find((cmp) => cmp.idComponent === id);
  }

  /**
   * Returns the active component
   * @return {Component} the active component
   */
  public getActiveComponent() {
    return Component.active;
  }

  public injectEvent(element: HTMLElement, eventType: string, code: string) {
    element.addEventListener(eventType, ((event) => {
      event?.preventDefault();
      this.runCode(code);
    }));
  }

  public confirm(msg: string, title?: string): Promise<boolean> {
    get(TAG_KEY).innerHTML = MODAL_HTML.replace('$msg', msg).replace('$title', title || 'Confirm');
    addListeners(get(TAG_KEY), false, this);
    return new Promise((res) => {
      get('openModal').click();
      View._res = res;
    });
  }

  public openModal(view: View, title?: string): Promise<any> {
    get(TAG_KEY).innerHTML = MODAL_HTML.replace('$title', title || 'Modal');
    get('modal-body').innerHTML = view.view;
    addListeners(get(TAG_KEY), false, view);
    this.addComponents(view.components, get('modal-body'), view);
    return new Promise((res) => {
      get('openModal').click();
      View._res = res;
    });
  }

  public notifySuccess(msg: string) {
    const notiTime = new Date().getTime();
    if (this.lastNotify + 1000 < notiTime) {
      Notiflix.Notify.success(msg);
      this.lastNotify = notiTime;
    }
  }

  public notifyError(msg: string) {
    const notiTime = new Date().getTime();
    if (this.lastNotify + 1000 < notiTime) {
      Notiflix.Notify.failure(msg);
      this.lastNotify = notiTime;
    }
  }

  public confirmCancel() {
    View._res(false);
  }

  public confirmConfirm() {
    View._res(View.active.model || true);
  }

  public onReady() {}

  public onChanges() {}

  public emmit(data: any) {}

  public message(message: any) {}

  public wsSend(message: any) {}

  private runCode(code: string) {
    eval(code);
  }
}
