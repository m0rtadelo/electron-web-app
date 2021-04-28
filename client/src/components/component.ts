import { IComponent } from "../interfaces/component.interface";

export class Component implements IComponent {
  public selector: string;
  private view: any;
  private parent: any;
  private self: any;
  private ttl = 0;
  private previousReturn = "";

  constructor() {
    this.self = setInterval(() => {
      if (this.parent) {
        this.render(this.view, this.parent);
      } else {
        this.ttl++;
        if (this.ttl > 20) {
          clearInterval(this.self);
        }
      }
    }, 250);
  }

  public render(view: any, parent: any) {
    this.view = view;
    this.parent = parent;
  }

  public return(html: string): boolean {
    if (html === this.previousReturn) {
      return false;
    }
    this.parent.innerHTML = html;
    this.previousReturn = html;
    return true;
  }

  public event(data: any) {}
}
