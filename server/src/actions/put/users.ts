import { users as model } from '../../model/users.model';

export const users = function(data: any) {
  if (model.some((item) => item.user === data.user)) {
    return { status: 409, data: { error: 'A user with this username already exists!' } };
  };
  delete data.repass;
  data.id = new Date().getTime();
  data.admin = data.admin || false;
  model.push(data);
  return { status: 201, data: { ...data, pass: undefined } };
};

