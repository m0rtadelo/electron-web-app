import { users as model } from '../../model/users.model';

export const users = function(data: any) {
  model.push(data);
  return data;
};
