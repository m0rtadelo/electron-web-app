import { View } from "../../core";
import { Component } from "../../core";

export class AppTypeComponent extends Component {
  public selector = 'app-type';

  public render(view: View, parent: any, dataToUse?: string) {
    super.render(view, parent, dataToUse);
    let data = this.getData();
    const replaceText = dataToUse ? data : ((window as any).api.electron ? 'electron-app' : 'web-app');
    super.return(
      `<div class="text-center" MouseEnter="this.setAttribute('onMouse', 1);" MouseLeave="this.setAttribute('onMouse', 0);">
      <small style="color: ${this.getAttribute('color')}">
      ${ +this.getAttribute('onMouse') ? '<strong>' : ''}
      ${ replaceText }
      ${ +this.getAttribute('onMouse') ? '</strong>' : ''}</small></div>`
    );
  }

  public test() {
    console.log('this test', this);
    this.setAttribute('onMouse', false);
    
  }
}