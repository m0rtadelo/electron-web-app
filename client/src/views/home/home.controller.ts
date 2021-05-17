import { HomeView } from './home.view';
import { ContactModalView } from './contacts.modal';
import { ContactsService } from './contacts.service';
import { get } from '../../core';
import { UsersModalView } from './users.modal';
import { UsersService } from './users.service';
import { Websocket } from '../../core/services/websocket';

export class HomeController {
  private view: HomeView;
  private contactsService = new ContactsService();
  private usersService = new UsersService();

  constructor(view: HomeView) {
    this.view = view;
    if (!(window as any).api.electron) {
      new Websocket('ws://localhost:4500', (data) => this.handle(data));
    }
  }

  public handle(message: any) {
    if (message.verb === 'patch' && message.action === 'contacts' && message.data.status === 200) {
      this.updateContact(message.data);
    }
  }

  public async addContact(data: any) {
    const result = await this.view.openModal(new ContactModalView(data.data), 'Contacts');
    if (result) {
      if (result.name && result.type && result.phone) {
        const response = await this.contactsService.add(result);
        if (response.status === 201) {
          this.view.model.contacts.push(response.data);
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

  public async editContact(data: any) {
    const result = await this.view.openModal(new ContactModalView(data.item), 'Contacts');
    if (result) {
      if (result.name && result.type && result.phone) {
        const response = await this.contactsService.edit(result);
        if (response.status === 200) {
          this.updateContact(response);
        } else {
          this.view.notifyError(response.data?.error || 'Unable to edit contact');
        }
      } else {
        data.data = result;
        void await this.view.emmit(data);
      }
    }
  }

  private updateContact(response: any) {
    const item = this.view.model.contacts.find((contact) => contact.id === response.data.id);
    if (item) {
      Object.keys(item).forEach((i) => {
        item[i] = response.data[i];
      });
    };
  }

  public async editUser(data: any) {
    const result = await this.view.openModal(new UsersModalView(data.item), 'Users');
    if (result) {
      if (result.user && result.pass && result.repass && result.pass === result.repass) {
        delete result.repass;
        const response = await this.usersService.edit(result);
        if (response.status === 200) {
          const item = this.view.model.users.find((user) => user.id === response.data.id);
          if (item) {
            Object.keys(item).forEach((i) => {
              item[i] = response.data[i];
            });
          };
        } else {
          this.view.notifyError(response.data?.error ||'Unable to edit user');
        }
      } else {
        data.data = result;
        void await this.view.emmit(data);
      }
    }
  }

  public async deleteContact(data: any) {
    const result = await this.contactsService.delete(data);
    if (result) {
      if (result.status === 200) {
        this.view.contacts = this.view.contacts.filter(
            (contact) => !(contact.name === data.name && contact.phone === data.phone),
        );
        this.view.model.contacts = this.view.model.contacts.filter(
            (contact) => !(contact.name === data.name && contact.phone === data.phone),
        );
        this.view.notifySuccess(`Contact ${data.name} deleted succesfully`);
      } else {
        this.view.notifyError(`${result.status} ${result.data?.error || 'Unknown error'}`);
      }
    }
  }

  public async addUser(data: any) {
    const result = await this.view.openModal(new UsersModalView(data.data), 'Users');
    if (result) {
      if (result.user && result.pass && result.repass && result.pass === result.repass) {
        delete result.repass;
        const response = await this.usersService.add(result);
        if (response.status === 201) {
          this.view.model.users.push(response.data);
          this.view.users.push(response.data);
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

  public async deleteUser(data: any) {
    const result = await this.usersService.delete(data);
    if (result) {
      if (result.status === 200) {
        this.view.users = this.view.users.filter(
            (user) => !(user.id === data.id),
        );
        this.view.model.users = this.view.model.users.filter(
            (user) => !(user.id === data.id),
        );
        this.view.notifySuccess(`User ${data.user} deleted succesfully`);
      } else {
        this.view.notifyError(`${result.status} ${result.data?.error || 'Unknown error'}`);
      }
    }
  }
}
