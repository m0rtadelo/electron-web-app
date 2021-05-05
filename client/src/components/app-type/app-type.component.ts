import { View } from '../../core';
import { Component } from '../../core';

export class AppTypeComponent extends Component {
  public selector = 'app-type';

  public render(view: View, parent: any, dataToUse?: string) {
    super.render(view, parent, dataToUse);
    const data = this.getData();
    const replaceText = dataToUse ? data : ((window as any).api.electron ? 'electron-app' : 'web-app');
    super.return(
        `<div class="text-center"">
      <small style="color: ${this.getAttribute('color')}">
      ${ replaceText }
      </small></div>`,
    );
  }
}
