import { IComponent } from "../interfaces/component.interface";
import { View } from "../views/view";

export class Component implements IComponent {
  public selector: string;
  private view: View;
  private parent: any;
  private self: any;
  private ttl = 0;
  private previousReturn = "";

  public enable() {
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

  public render(view: View, parent: any) {
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
