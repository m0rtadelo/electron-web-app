import { View } from "../views/view";
import { Component } from "./component";

export class AppTypeComponent extends Component {
  public selector = 'app-type';

  public render(view: View, parent: any) {
    super.render(view, parent);
    let isBold = this.getAttribute('onMouse');
    let data = this.getData();
    super.return(
      `<div class="text-center" onMouseEnter="window.values.add('onMouse', 1, this);" onMouseLeave="window.values.add('onMouse', 0, this);">
      <small style="color: ${this.getAttribute('color')}">
      ${ +isBold ? '<strong>' : ''}
      ${ data || (window as any).api.electron ? 'electron-app' : 'web-app' }
      ${ +isBold ? '</strong>' : ''}</small></div>`
    );
  }
}