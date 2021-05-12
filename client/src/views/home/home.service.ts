import { HomeView } from './home.view';
import { ContactModalView } from './contacts.modal';
import { ContactsService } from './contacts.service';
import { get } from '../../core';
import { UsersModalView } from './users.modal';
import { UsersService } from './users.service';

export class HomeService {
  private view: HomeView;
  private contactsService = new ContactsService();
  private usersService = new UsersService();

  constructor(view: HomeView) {
    this.view = view;
  }

  public async addContact(data: any) {
    const result = await this.view.openModal(new ContactModalView(data.data), 'Contacts');
    if (result) {
      if (result.name && result.type && result.phone) {
        const response = await this.contactsService.add(result);
        if (response.status === 201) {
          this.view.model.contacts.push(result);
          void await this.view.emmit({ action: 'search', search: get('searchbox').value });
          this.view.notifySuccess(`Contact ${response.data?.name} created`);
        } else {
          this.view.notifyError(response.data?.error ||'Unable to create contact');
        }
      } else {
        data.data = result;
        void await this.view.emmit(data);
      }
    }
  }

  public async addUser(data: any) {
    const result = await this.view.openModal(new UsersModalView(data.data), 'Users');
    if (result) {
      if (result.user && result.pass && result.repass) {
        const response = await this.usersService.add(result);
        if (response.status === 201) {
          this.view.model.users.push(result);
          this.view.notifySuccess(`User ${response.data?.user} created`);
        } else {
          this.view.notifyError(response.data?.error ||'Unable to create user');
        }
      } else {
        data.data = result;
        void await this.view.emmit(data);
      }
    }
  }
}
