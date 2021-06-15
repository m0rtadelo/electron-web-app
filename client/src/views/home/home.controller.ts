import { HomeView } from './home.view';
import { ContactModalView } from './contacts.modal';
import { ContactsService } from './contacts.service';
import { get } from '../../core';
import { UsersModalView } from './users.modal';
import { UsersService } from './users.service';
import { i18n } from '../../core/services/i18';

export class HomeController {
  private view: HomeView;
  private contactsService = new ContactsService();
  private usersService = new UsersService();

  constructor(view: HomeView) {
    this.view = view;
  }

  public async addContact(data: any) {
    const result = await this.view.modal.open(new ContactModalView(data.data), i18n.get('contacts'));
    if (result) {
      if (result.name && result.type && result.phone) {
        const response = await this.contactsService.add(result);
        if (response.status === 201) {
          this.pushContact(response);
        } else {
          this.view.notifyError(response.data?.error ||'Unable to create contact');
        }
      } else {
        data.data = result;
        void await this.view.emmit(data);
      }
    }
  }

  public async pushContact(response) {
    if (!this.view.model.contacts.some((contact) => contact.id === response.data.id)) {
      this.view.model.contacts.push(response.data);
      void await this.view.emmit({ action: 'search', search: get('searchbox').value });
      this.view.notifySuccess(`Contact ${response.data?.name} created`);
    }
  }

  public async editContact(data: any) {
    const result = await this.view.modal.open(new ContactModalView(data.item), i18n.get('contacts'));
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

  public updateContact(response: any) {
    const item = this.view.model.contacts.find((contact) => contact.id === response.data.id);
    if (item) {
      Object.keys(item).forEach((i) => {
        item[i] = response.data[i];
      });
      this.view.notifySuccess(`Contact ${response.data.name} updated`);
    };
  }

  public async editUser(data: any) {
    const result = await this.view.modal.open(new UsersModalView(data.item), i18n.get('users'));
    if (result) {
      if (result.user && result.pass && result.repass && result.pass === result.repass) {
        delete result.repass;
        const response = await this.usersService.edit(result);
        if (response.status === 200) {
          this.updateUser(response);
        } else {
          this.view.notifyError(response.data?.error ||'Unable to edit user');
        }
      } else {
        data.data = result;
        void await this.view.emmit(data);
      }
    }
  }

  public updateUser(response: any) {
    const item = this.view.model.users.find((user) => user.id === response.data.id);
    if (item) {
      Object.keys(item).forEach((i) => {
        item[i] = response.data[i];
      });
      this.view.notifySuccess(`User ${response.data.user} updated`);
    };
  }

  public async deleteContact(data: any) {
    const result = await this.contactsService.delete(data);
    if (result) {
      if (result.status === 200) {
        this.removeContact(data);
      } else {
        this.view.notifyError(`${result.status} ${result.data?.error || 'Unknown error'}`);
      }
    }
  }

  public removeContact(data: any) {
    this.view.contacts = this.view.contacts.filter(
        (contact) => !(contact.name === data.name && contact.phone === data.phone),
    );
    this.view.model.contacts = this.view.model.contacts.filter(
        (contact) => !(contact.name === data.name && contact.phone === data.phone),
    );
    this.view.notifySuccess(`Contact ${data.name} deleted succesfully`);
  }

  public async addUser(data: any) {
    const result = await this.view.modal.open(new UsersModalView(data.data), i18n.get('users'));
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
