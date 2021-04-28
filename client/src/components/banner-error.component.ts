import { Component } from "./component";

export class BannerErrorComponent extends Component {
  public selector = "banner-error";

  constructor() {
    super();
  }

  public render(view: any, parent: any) {
    const data = view.data;
    const html = `
        <div class="row" style="margin-top: 1em;" id="error-div">
        <div class="alert alert-danger" role="alert">
          <strong id="status">${data?.status}</strong> <span id="error">${
      data?.status === 401
        ? "Invalid Credentials"
        : data?.error || data?.data?.error || "Unknown error"
    }</span>
        </div>
      </div>`;
    super.render(view, parent);
    this.return(data ? html : '');
  }
}
