import { View, get } from '../../core';
import { Component } from '../../core';
import { LoginView } from '../../views/login/login.view';
import { i18 } from '../../core/services/i18';

export class MenuComponent extends Component {
  public selector = 'app-menu';

  public render(view: View, parent: any) {
    const data = view.model;
    super.render(view, parent);
    this.return(`  
    <nav class="navbar navbar-expand-sm sticky-top" id="app">
<div class="container-fluid">
    <a class="navbar-brand" href="#" style="font-weight: 900; color: #dddd; text-shadow: 2px 2px 2px #444444;">E.W.A</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link ${data?.section === 0 ? 'active' : ''}" aria-current="page" click="this.view.model.section = 0;" href="#">${i18.get('contacts')}</a>
        </li>
        ${ data?.admin ?
        `<li class="nav-item">
          <a class="nav-link ${data?.section === 1 ? 'active' : ''}" aria-current="page" click="this.view.model.section = 1;" href="#">${i18.get('users')}</a>
        </li>` :
        ''}
      <li class="nav-item"><a class="nav-link" href="#" click="this.logout();">Logout</a></li>
        </ul>
      <form class="d-flex" id="form">
        
        <input type="text" class="form-control" keyup="this.search()" id="searchbox" placeholder="${i18.get('search-contacts')}" aria-label="Search" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" click="this.search()" type="button" id="button-addon2"><i class="bi bi-search"></i></button>

      </form>  
    </div>
    </div>
</nav>
  `);
  }

  public async logout() {
    if (await this.view.confirm('<i class="bi bi-question-circle"></i> Are you sure you want to logout?')) {
      new LoginView();
    }
  }

  public search() {
    this.view.emmit({ action: 'search', search: get('searchbox').value });
  }
}
