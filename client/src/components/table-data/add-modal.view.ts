import { View } from "../../core";
import { AppTypeComponent } from "../app-type/app-type.component";

export class AddModalView extends View {
  constructor(data?: any) {
    super(
      `
    <strong click="this.doit()">modal</strong>
    <app-type click="console.log(this);"></app-type>
    `,
      [new AppTypeComponent()],
      data,
      undefined,
      true
    );
  }

  public doit() {
    console.log(this);
    this.confirmCancel();
  }  
}
