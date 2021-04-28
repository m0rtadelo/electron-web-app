import { Component } from "./component";

export class BannerErrorComponent extends Component {
    public selector = 'banner-error';

    constructor() {
        super();
    }

    public render(view: any, parent: any) {
        const html = `
        <div class="row" style="margin-top: 1em;" id="error-div">
        <div class="alert alert-danger" role="alert">
          <strong id="status">${view.data?.status}</strong> <span id="error">${view.data?.status === 401 ? 'Invalid Credentials' : view.data?.error || view.data?.data?.error || 'Unknown error'}</span>
        </div>
      </div>
        ${new Date().toString()}
        `
        super.render(view, parent);
        if (view.data) {
            this.return(html);
        }
    }

}