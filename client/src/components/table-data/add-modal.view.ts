import { View } from "../../core";
import { AppTypeComponent } from "../app-type/app-type.component";

export class AddModalView extends View {
  constructor(data?: any) {
    super(
      `
    <strong click="console.log(this); this._res(false);">modal</strong>
    <app-type click="console.log(this);"></app-type>
    `,
      [new AppTypeComponent()],
      data,
      undefined,
      true
    );
  }

  
}
