import "../assets/css/bootstrap.min.css";

import { LoginView } from "./views/login/login.view";

window.onload = () => {
  (window as any).appClass = (window as any).body.getAttribute("class");
  new LoginView();
};
