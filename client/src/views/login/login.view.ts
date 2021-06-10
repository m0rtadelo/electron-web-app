import { get, getFormData } from '../../core/utils/ui';
import { LoginService } from './login.service';
import { LOGIN_HTML } from './login.html';
import { HomeView } from '../home/home.view';
import { View } from '../../core';
import { BannerErrorComponent, LoginComponent, AppTypeComponent } from '../../components';
import { DateHourComponent } from '../../components/date-hour/date-hour.component';
import { LangpickerComponent } from '../../components/lang-picker/lang-picker.component';

export class LoginView extends View {
  public testData = 'surprise';
  constructor(data?: any) {
    super(LOGIN_HTML, [
      new BannerErrorComponent(),
      new LoginComponent(),
      new DateHourComponent(),
      new AppTypeComponent(),
      new LangpickerComponent(),
    ], data, new LoginService());
  }

  public onReady() {
    get('user').focus();
  }

  public emmit = async () => {
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
    if (this.model?.status === 200 && this.model?.data?.id) {
      new HomeView(this.model.data);
    }
  }
}
