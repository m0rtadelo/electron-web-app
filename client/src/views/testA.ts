import { View } from "../core";
import { TestB } from "./testB";

export class TestA extends View {
  constructor(data?: any) {
    super('<div click="console.log(this);">testA</div><button click="this.openB()">testB</button>', [], data);
  }

  public openB() {
    new TestB();
  }
}