import { get, View } from '../../core';
import { AppTypeComponent } from '../../components/app-type/app-type.component';

export class ContactModalView extends View {
  constructor(data?: any) {
    super(
        `
      <form submit="this.submit()">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name</label>
          <input class="form-control ${data && !data.name ? 'is-invalid': ''}" 
          change="this.setValue('name')" value="${data?.name ?? ''}" type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="type">Type</label>
          <input class="form-control ${data && !data.type ? 'is-invalid': ''}" 
          change="this.setValue('type')" value="${data?.type ?? ''}" type="text" id="type" required>
        </div>
      </div>
      <div class="form-group">
      <label for="phone">Phone number</label>
      <input class="form-control ${data && !data.phone ? 'is-invalid': ''}" 
      change="this.setValue('phone')" value="${data?.phone ?? ''}" type="text" id="phone" required>
    </div>
    <button type="submit" style="display:none;"></type>
    </form>    `,
        [new AppTypeComponent()],
        data,
        undefined,
        true,
    );
    this.model = data || {};
  }

  public setValue(value: string) {
    this.model[value] = get(value).value;
  }

  public submit() {
    get('openModal').click();
    this.confirmConfirm();
  }

  public onReady() {
    setTimeout(() => {
      get('name').focus();
    }, 500);
  }
}
