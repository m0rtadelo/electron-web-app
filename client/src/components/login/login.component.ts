import { View } from '../../core';
import { Component } from '../../core';
import { addEventListener, getFormData, putFormData } from '../../core';
import { i18 } from '../../core/services/i18';

export class LoginComponent extends Component {
  public selector = 'login';

  public render(view: View, parent: any) {
    const formData =getFormData();
    const html = `

<div style="display: flex; right: 0; top:0; position: absolute;">
<select class="selectpicker" data-width="fit">
    <option data-content='<span class="flag-icon flag-icon-us"></span> English'>English</option>
  <option  data-content='<span class="flag-icon flag-icon-es"></span> Español'>Español</option>
</select>
<!--
  <div ${this.styleLang('ca')}>CA</div>
  <div ${this.styleLang('es')}>ES</div>
  <div ${this.styleLang('en')}>EN</div>-->
</div>
    <form id="loginForm">
          <h1 class="text-center"><strong>E.W.A</strong></h1>
          <div>
            <div class="mb-3">
              <input class="form-control" type="text" id="user" placeholder="${i18.get('username')}" required 
              ${view.loading ? 'disabled' : ''}/>
            </div>
            <div class="mb-3">
              <input class="form-control" type="password" id="pass" placeholder="${i18.get('password')}" required 
              ${view.loading ? 'disabled' : ''}/>
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="submit" value="Login" ${view.loading ? 'disabled' : ''}>
              ${view.loading ?
                '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>' : '' }
              Login
              </button>
            </div>
          </div>
    </form>
`;
    super.render(view, parent);
    if (super.return(html)) {
      putFormData(formData);
      addEventListener('loginForm', 'submit', () => view.emmit(undefined) );
    }
  }

  public styleLang(lang: string) {
    return `style="  margin: 0.5em;
    background-color: ${lang === i18.lang ? 'grey' : '#EEEEEE'};
    color: white;
    border-radius: 2em;
    width: 2em;
    height: 2em;
    padding-left: 0.5em;
    padding-top: 0.5em;
  "`;
  }
}
