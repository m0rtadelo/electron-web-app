import '../assets/css/bootstrap.min.css';
import { HomeView } from './views/home/home.view';
import { LoginView } from './views/login/login.view';

window.onload = () => {
  (window as any).api.electron ?
  new HomeView({ user: 'user', admin: false }) :
  new LoginView();
};
