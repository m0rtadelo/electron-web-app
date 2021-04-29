import { Component } from "./component";
import { addEventListener, get, getFormData, putFormData } from "../utils/ui";
import { View } from "../views/view";

export class LoginComponent extends Component {
  public selector = "login";

  public render(view: View, parent: any) {
    const data = view.model;
    const formData =getFormData();
    const html = `
    <form id="loginForm">
          <h1 class="text-center"><strong>E.W.A</strong></h1>
          <div>
            <div class="mb-3">
              <input class="form-control" type="text" id="user" placeholder="Username" required ${view.loading ? 'disabled' : ''}/>
            </div>
            <div class="mb-3">
              <input class="form-control" type="password" id="pass" placeholder="Password" required ${view.loading ? 'disabled' : ''}/>
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="submit" value="Login" ${view.loading ? 'disabled' : ''}>
              ${view.loading ? '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' : '' }
              Login
              </button>
            </div>
          </div>
    </form>
`;
    super.render(view, parent);
    if(super.return(html)) {
      putFormData(formData);
      addEventListener('loginForm', 'submit', () => view.emmit(undefined) );
    }
  }
}