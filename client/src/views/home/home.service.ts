import { HomeView } from './home.view';
import { ContactModalView } from './contacts.modal';
import { ContactsService } from './contacts.service';
import { get } from '../../core';

export class HomeService {
  private view: HomeView;
  private contactsService = new ContactsService();

  constructor(view: HomeView) {
    this.view = view;
  }

  public async addContact(data: any) {
    const result = await this.view.openModal(new ContactModalView(data.data), 'Contacts');
    if (result) {
      if (result.name && result.type && result.phone) {
        const response = await this.contactsService.add(result);
        if (response.status === 200) {
          this.view.model.contacts.push(result);
          void await this.view.emmit({ action: 'search', search: get('searchbox').value });
        } else {
          alert('ERROR');
        }
      } else {
        data.data = result;
        void await this.view.emmit(data);
      }
    }
  }
}
