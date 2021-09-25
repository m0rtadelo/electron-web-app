import '../assets/css/bootstrap.min.css';
import '../node_modules/vercel-toast/dist/vercel-toast.css';
import { LoginView } from './views/login/login.view';

window.onload = () => {
  new LoginView();
};
