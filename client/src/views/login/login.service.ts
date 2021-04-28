import { ILogin } from "../../interfaces/login.interface";
import { Service } from "../service";

export class LoginService implements Service {
  query = async (data: ILogin) =>
    await (window as any).api.post({ action: "login", data });
}
