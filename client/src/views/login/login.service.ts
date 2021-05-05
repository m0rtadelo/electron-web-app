import { ILogin } from '../../core/interfaces/login.interface';
import { Service } from '../../core/services/service';

export class LoginService implements Service {
  query = async (data: ILogin) => await (window as any).api.post({ action: 'login', data });
}
