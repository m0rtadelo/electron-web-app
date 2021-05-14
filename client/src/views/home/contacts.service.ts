import { Service } from '../../core';

export class ContactsService implements Service {
  query = async (data: any) => await (window as any).api.post({ action: 'contacts', data });
  add = async (data: any) => await (window as any).api.put({ action: 'contacts', data });
  delete = async (data: any) => await (window as any).api.delete({ action: 'contacts', data });
}
