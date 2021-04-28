import { Service } from "../service";
import { HomeView } from "../home/home.view";
import { ILogin } from "../../interfaces/login.interface";

export class LoginService implements Service {
  public query = async (data: ILogin) => await (window as any).api.post({ action: "login", data });
}
