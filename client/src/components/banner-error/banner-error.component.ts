import {View} from '../../core';
import {Component} from '../../core';

export class BannerErrorComponent extends Component {
  public selector = 'banner-error';

  public render(view: View, parent: any) {
    const data = view.model;
    const html = `
        <div class="row" style="margin-top: 1em;" id="error-div">
        <div class="alert alert-danger" role="alert">
          <strong id="status">${data?.status}</strong> <span id="error">${
      data?.status === 401 ?
        'Invalid Credentials' :
        data?.error || data?.data?.error || 'Unknown error'
}</span>
        </div>
      </div>`;
    super.render(view, parent);
    this.return(data && !view.loading ? html : '');
  }
}
