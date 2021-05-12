import { users as model } from '../../model/users.model';

export const users = function(data: any) {
  if (model.some((item) => item.user === data.user)) {
    return { status: 409, data: { error: 'A user with this username already exists!' } };
  };
  model.push(data);
  return { status: 201, data };
};
