import { View } from '../../core';
import { HOME_HTML } from './home.html';
import { MenuComponent, TableDateComponent } from '../../components';
import { AddModalView } from '../../components/table-data/add-modal.view';
import { ContactsService } from './contacts.service';

// enum Sections { CONTACTS, USERS };
export class HomeView extends View {
  public users: any = [{ id: 5, name: 'Pol', admin: false }, { id: 1, name: 'Ricard', admin: true }];
  public contacts: any = [];
  private contactsService = new ContactsService();

  constructor(data?: any) {
    super(HOME_HTML, [new MenuComponent(), new TableDateComponent()], data);
  }

  async onReady() {
    this.loading = true;
    this.contacts = (await this.contactsService.query(undefined)).data;
    this.loading = false;
  }

  public async emmit(data: any) {
    if (data.action === 'add') {
      const result = await this.openModal(new AddModalView(data.data), 'Contacts');
      if (result) {
        if (result.name && result.type && result.phone) {
          console.log(result);
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
