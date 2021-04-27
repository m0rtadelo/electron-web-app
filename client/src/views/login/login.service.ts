import { Service } from "../service";
import { HomeView } from "../home/home.view";

interface ILogin { user: string; pass: string; }

export class LoginService implements Service {
    public query = async (data: ILogin) => await (window as any).api.post({ action: 'login', data });
    public goHome = () => new HomeView();
}