import { Service } from '../../core';

export class UsersService implements Service {
  query = async (data: any) => await (window as any).api.post({ action: 'users', data });
  add = async (data: any) => await (window as any).api.put({ action: 'users', data });
}
