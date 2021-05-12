import { get, View } from '../../core';

export class UsersModalView extends View {
  constructor(data?: any) {
    super(
        `
      <form submit="this.submit()">
      <div class="form-row">
        <div class="form-group">
          <label for="user">Username</label>
          <input class="form-control ${data && !data.user ? 'is-invalid': ''}" 
          change="this.setValue('user')" value="${data?.user ?? ''}" type="text" id="user" required>
        </div>
        <div class="form-group">
          <label for="pass">Password</label>
          <input class="form-control ${data && !data.pass ? 'is-invalid': ''}" 
          change="this.setValue('pass')" value="${data?.pass ?? ''}" type="password" id="pass" required>
        </div>
        <div class="form-group">
          <label for="repass">Repeat password</label>
          <input class="form-control ${data && !data.repass ? 'is-invalid': ''}" 
          change="this.setValue('repass')" value="${data?.repass ?? ''}" type="password" id="repass" required>
        </div>
      </div>
      <div class="form-group">
        <div class="form-check form-switch">
          <label for="admin">Admin</label>
          <input class="form-check-input" 
          change="this.setValue('admin')" value="${data?.admin ?? ''}" type="checkbox" id="admin" required>
        </div>
      </div>
      <button type="submit" style="display:none;"></type>
    </form>    `,
        [],
        data,
        undefined,
        true,
    );
    this.model = data || {};
  }

  public setValue(value: string) {
    if (get(value).type === 'checkbox') {
      this.model[value] = get(value).checked;
    } else {
      this.model[value] = get(value).value;
    }
  }

  public submit() {
    get('openModal').click();
    this.confirmConfirm();
  }

  public onReady() {
    setTimeout(() => {
      get('user').focus();
    }, 500);
  }
}
