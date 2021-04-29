import { Component } from "./component";
import { View } from "../views/view";

export class MenuComponent extends Component {
  public selector = 'menu';

  public render(view: View, parent: any) {
    const data = view.data;
    super.render(view, parent);
    this.return(`  
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" id="app">
<div class="container-fluid">
    <a class="navbar-brand" href="#">E.W.A</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
      </ul>
      <form class="d-flex" id="form">
        <input class="form-control me-2" type="text" value="${data?.user} (id:${data?.id})" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">
          Logout
        </button>
      </form>  
    </div>
    </div>
</nav>
  `);
  }
}