import "../assets/css/bootstrap.min.css";

import { LoginView } from "./views/login/login.view";
import { HomeView } from "./views/home/home.view";

window.onload = () => {
  new LoginView();
};
