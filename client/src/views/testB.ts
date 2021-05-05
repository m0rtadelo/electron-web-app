import { View } from '../core';
import { TestA } from './testA';
import { AppTypeComponent } from '../components';

export class TestB extends View {
  constructor(data?: any) {
    super(`
    <div click="console.log(this);">testB</div><button click="this.openA()">testA</button>
    <app-type dataToUse="testB" ></app-type>
    `, [new AppTypeComponent()], data);
  }

  public openA() {
    new TestA();
  }
}
