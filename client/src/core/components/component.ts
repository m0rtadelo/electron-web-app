import { View, addListeners } from '..';
import { IComponent } from './component.interface';
import { INTERVAL } from '../constants';

export class Component implements IComponent {
  public static active: Component;
  public static event: Component;
  public selector: string;
  public idComponent: string;
  public view: View;
  private parent: any;
  private dataToUse: any;
  private self: any;
  private ttl = 0;
  private previousReturn = '';
  private static counter = 0;
  private static hash = Math.random().toString(36).substring(2).concat(Math.random().toString(36).substring(2));
  private static eventComponents: any = {};

  constructor() {
    this.runCode.bind(this);
  }

  private static getHash() {
    Component.counter++;
    return Component.hash.concat(Component.counter.toString());
  }

  public enable() {
    this.idComponent = Component.getHash();
    this.self = setInterval(() => {
      if (this.parent) {
        this.render(this.view, this.parent, this.dataToUse);
      } else {
        this.ttl++;
        if (this.ttl > 20) {
          clearInterval(this.self);
        }
      }
    }, INTERVAL);
  }

  public render(view: View, parent: any, dataToUse?: string) {
    Component.active = this;
    this.view = view;
    this.parent = parent;
    this.dataToUse = dataToUse;
  }

  public return(html: string): boolean {
    if (html === this.previousReturn) {
      return false;
    }
    this.parent.innerHTML = html;
    addListeners(this.parent, true, this);
    this.previousReturn = html;
    this.view.onChanges();

    return true;
  }

  public setAttribute(param: string, value: any) {
    if (this.parent) {
      this.parent.setAttribute(param, value);
    }
  }

  public getAttribute(param: string) {
    if (this.parent) {
      return this.parent.getAttribute(param);
    }
  }

  public getData(): any {
    return !this.dataToUse ?
    this.view.model :
    (this.view as any)[this.dataToUse];
  }

  public setData(newData: any): void {
    this.dataToUse ?
    (this.view as any)[this.dataToUse] = newData :
      this.view.model = newData;
  }

  public injectEvent(element: HTMLElement, eventType:string, code: string) {
    element.addEventListener(eventType, (() => {
      this.runCode(code);
    }));
  }

  private runCode(code: string) {
    Component.event = this;
    eval(code);
  }
}
