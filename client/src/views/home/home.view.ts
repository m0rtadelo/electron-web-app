import { View, get } from '../../core';
import { HOME_HTML } from './home.html';
import { MenuComponent, TableDateComponent } from '../../components';
import { ContactsService } from './contacts.service';
import { UsersService } from './users.service';
import { HomeController } from './home.service';
import { DateHourComponent } from '../../components/date-hour/date-hour.component';

export class HomeView extends View {
  public users: any = [];
  public contacts: any = [];
  private controller = new HomeController(this);
  private contactsService = new ContactsService();
  private usersService = new UsersService();

  constructor(data?: any) {
    super(HOME_HTML, [new MenuComponent(), new TableDateComponent(), new DateHourComponent()], data);
  }

  async onReady() {
    this.loading = true;
    this.model.section = 0;
    this.contacts = (await this.contactsService.query(undefined)).data;
    if (this.model.admin) {
      this.users = (await this.usersService.query(undefined)).data;
    }
    this.model.users = [...this.users];
    this.model.contacts = [...this.contacts];
    setTimeout(() => {
      get('searchbox').focus();
    }, 500);
    this.loading = false;
  }

  public onChanges() {
    if (this.model.section === 0) {
      this.switchView(['contacts', 'users']);
    } else {
      this.switchView(['users', 'contacts']);
    }
  }

  public async emmit(data: any) {
    if (data.action === 'search') {
      this.contacts = this.model.contacts.filter((contact: any) =>
        contact.name.toLowerCase().includes(data.search) || contact.phone.toLowerCase().includes(data.search));
      return;
    }
    if (data.action === 'add' && data.idComponent === 'contacts') {
      await this.controller.addContact(data);
    }
    if (data.action === 'add' && data.idComponent === 'users') {
      await this.controller.addUser(data);
    }
    if (data.action === 'edit' && data.idComponent === 'contacts') {
      await this.controller.editContact(data);
    }
    if (data.action === 'edit' && data.idComponent === 'users') {
      await this.controller.editUser(data);
    }
    if (data.action === 'delete' && data.idComponent === 'contacts') {
      await this.controller.deleteContact(data.item);
    }
    if (data.action === 'delete' && data.idComponent === 'users') {
      await this.controller.deleteUser(data.item);
    }
  }

  private switchView(items: string[]) {
    get(items[0]).style = '';
    get(items[1]).style = 'display: none;';
  }
}
