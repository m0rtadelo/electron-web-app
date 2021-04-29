import { IComponent } from "../interfaces/component.interface";
import { View } from "../views/view";

export class Component implements IComponent {
  public selector: string;
  public idComponent: string;
  private view: View;
  private parent: any;
  private dataToUse: any;
  private self: any;
  private ttl = 0;
  private previousReturn = "";

  public enable() {
    this.idComponent = new Date().getTime().toString().concat(this.selector);
    this.self = setInterval(() => {
      if (this.parent) {
        this.render(this.view, this.parent);
      } else {
        this.ttl++;
        if (this.ttl > 20) {
          clearInterval(this.self);
        }
      }
    }, 50);
  }

  public render(view: View, parent: any, dataToUse?: any) {
    this.view = view;
    this.parent = parent;
    this.dataToUse = dataToUse;
  }

  public return(html: string): boolean {
    if (html === this.previousReturn) {
      return false;
    }
    this.parent.innerHTML = html;
    this.previousReturn = html;
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
    return this.dataToUse ?? this.view.data;
  }

  public setData(newData: any): void {
    this.dataToUse ?
      this.dataToUse = newData :
      this.view.data = newData;
  }

  public event(data: any) {}
}
