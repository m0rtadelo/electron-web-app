import { get, View } from "../../core";
import { AppTypeComponent } from "../app-type/app-type.component";

export class AddModalView extends View {
  model: any = {};
  constructor(data?: any) {
    super(
      `
      <form submit="this.submit()">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name</label>
          <input class="form-control" blur="this.setValue('name')" type="text" id="name">
        </div>
        <div class="form-group">
          <label for="type">Type</label>
          <input class="form-control" blur="this.setValue('type')" type="text" id="type">
        </div>
      </div>
      <div class="form-group">
      <label for="phone">Phone number</label>
      <input class="form-control" blur="this.setValue('phone')" type="text" id="phone">
    </div>
    <button type="submit" style="display:none;"></type>
    </form>    `,
      [new AppTypeComponent()],
      data,
      undefined,
      true
    );
  }

  public setValue(value: string) {
    this.model[value] = get(value).value;
  }

  public submit() {
    get("openModal").click();
    this.confirmConfirm();
  }
}
