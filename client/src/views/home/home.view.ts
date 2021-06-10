import { View, get } from '../../core';
import { HOME_HTML } from './home.html';
import { MenuComponent, TableDateComponent } from '../../components';
import { ContactsService } from './contacts.service';
import { UsersService } from './users.service';
import { HomeController } from './home.controller';
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
    (window as any).api.message((data) => {
      this.message(data);
    });
  }

  public message(message: any) {
    console.log('received message', message);
    const map = {
      'socket-mycounter': () => this.showSocketNoti('MyCounter', message.data.message),
      'socket-counter': () => this.showSocketNoti('Counter', message.data.message),
      'patch-contacts': () => this.controller.updateContact(message.data),
      'patch-users': () => this.controller.updateUser(message.data),
      'put-contacts': () => this.controller.pushContact(message.data),
      'delete-contacts': () => this.controller.removeContact(message.data),
    };
    if (message?.data?.status && [200, 201].includes(message.data.status)) {
      map[`${message.verb}-${message.action}`]?.();
    }
  }

  public onChanges() {
    if (this.model.section === 0) {
      this.switchView(['contacts', 'users']);
    } else {
      this.switchView(['users', 'contacts']);
    }
  }

  public async emmit(data: any) {
    const map = {
      'add-contacts': async () => await this.controller.addContact(data),
      'add-users': async () => await this.controller.addUser(data),
      'edit-contacts': async () => await this.controller.editContact(data),
      'edit-users': async () => await this.controller.editUser(data),
      'delete-contacts': async () => await this.controller.deleteContact(data.item),
      'delete-users': async () => await this.controller.deleteUser(data.item),
    };
    if (data.action === 'search') {
      this.contacts = this.model.contacts.filter((contact: any) =>
        contact.name.toLowerCase().includes(data.search) || contact.phone.toLowerCase().includes(data.search));
      return;
    }
    return await map[`${data.action}-${data.idComponent}`]?.();
  }

  public switchCounter() {
    this.sendMessage('counter');
  }
  public switchMyCounter() {
    this.sendMessage('mycounter');
  }
  private switchView(items: string[]) {
    get(items[0]).style = '';
    get(items[1]).style = 'display: none;';
  }
  private showSocketNoti(title, value) {
    this.notifySuccess(`${title}: ${value}`);
  }
}
