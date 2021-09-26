import { getFormData } from '../../core/utils/ui';
import { LoginService } from './login.service';
import { LOGIN_HTML } from './login.html';
import { HomeView } from '../home/home.view';
import { View } from '../../core';
import { LangpickerComponent } from '../../components';

export class LoginView extends View {
  constructor(data?: any) {
    super(LOGIN_HTML, [
      new LangpickerComponent(),
    ], data, new LoginService());
    this.notifyClear();
  }

  public onReady() {
    // get('user').focus();
    setTimeout(async () => {
      this.emmit();
    }, 0);
  }

  public async emmit() {
    this.loading = true;
    this.model = await this.service.query(getFormData());
    this.loading = false;
  };

  public onChanges() {
    if (View.active === this) {
      this.checkSuccessResponse();
    }
  }

  private checkSuccessResponse() {
    console.log(this.model);
    if (this.model?.status === 200 && this.model?.data?.id) {
      new HomeView(this.model.data);
    }
  }
}
