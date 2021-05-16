import { Service } from '../../core';

export class UsersService implements Service {
  query = async (data: any) => await (window as any).api.post({ action: 'users', data });
  add = async (data: any) => await (window as any).api.put({ action: 'users', data });
  delete = async (data: any) => await (window as any).api.delete({ action: 'users', data });
  edit = async (data: any) => await (window as any).api.patch({ action: 'users', data });
}
