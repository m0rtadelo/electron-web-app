import { users as model } from '../../model/users.model';
import { getId } from '../../utils/uid';

export const users = function(data: any) {
  if (model.some((item) => item.user === data.user)) {
    return { status: 409, data: { error: 'A user with this username already exists!' } };
  };
  delete data.repass;
  data.id = getId();
  data.admin = data.admin || false;
  model.push(data);
  return { status: 201, data: { ...data, pass: undefined } };
};

