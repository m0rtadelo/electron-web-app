import { View, get } from '../../core';
import { HOME_HTML } from './home.html';
import { MenuComponent, TableDateComponent } from '../../components';
import { AddModalView } from '../../components/table-data/add-modal.view';
import { ContactsService } from './contacts.service';
import { UsersService } from './users.service';

// enum Sections { CONTACTS, USERS };
export class HomeView extends View {
  public users: any = [];
  public contacts: any = [];
  private contactsService = new ContactsService();
  private usersService = new UsersService();

  constructor(data?: any) {
    super(HOME_HTML, [new MenuComponent(), new TableDateComponent()], data);
  }

  async onReady() {
    this.loading = true;
    this.contacts = (await this.contactsService.query(undefined)).data;
    if (this.model.admin) {
      this.users = (await this.usersService.query(undefined)).data;
    }
    this.model.section = 0;
    this.loading = false;
  }

  public onChanges() {
    if (this.model.section === 0) {
      get('contacts').style = '';
      get('users').style = 'display:none;';
    } else {
      get('users').style = '';
      get('contacts').style = 'display:none;';
    }
  }

  public async emmit(data: any) {
    if (data.action === 'add') {
      const result = await this.openModal(new AddModalView(data.data), 'Contacts');
      if (result) {
        if (result.name && result.type && result.phone) {
          const response = await this.contactsService.add(result);
          if (response.status === 200) {
            this.contacts.push(result);
          } else {
            alert('ERROR');
          }
        } else {
          data.data = result;
          void await this.emmit(data);
        }
      }
    }
  }
}
