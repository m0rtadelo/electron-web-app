import { View } from '../../core';
import { HomeView } from '../home/home.view';
import { InitService } from './init.service';

export class InitView extends View {
  service;
  constructor(data?: any) {
    super('');
    this.service = new InitService();
  }

  public async onReady() {
    console.log(await this.service.init());
    new HomeView({});
  }
}
