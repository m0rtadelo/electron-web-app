import { View } from "../../core";
import { Component } from "../../core";

export class AppTypeComponent extends Component {
  public selector = 'app-type';

  public render(view: View, parent: any, dataToUse?: string) {
    super.render(view, parent, dataToUse);
    let isBold = this.getAttribute('onMouse');
    let data = this.getData();
    const replaceText = dataToUse ? data : ((window as any).api.electron ? 'electron-app' : 'web-app');
    super.return(
      `<div class="text-center" onMouseEnter="window.values.add('onMouse', 1, this);" onMouseLeave="window.values.add('onMouse', 0, this);">
      <small style="color: ${this.getAttribute('color')}">
      ${ +isBold ? '<strong>' : ''}
      ${ replaceText }
      ${ +isBold ? '</strong>' : ''}</small></div>`
    );
  }

  public test() {
    console.log('this test', this);
    this.setAttribute('onMouse', false);
    
  }
}