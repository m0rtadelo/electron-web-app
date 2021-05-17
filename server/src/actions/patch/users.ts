import { users as model } from '../../model/users.model';

export const users = function(data: any) {
  const keys = Object.keys(data);
  const user = model.find((user) => user.id === data.id);
  if (user) {
    keys.forEach((key) => {
      user[key] = data[key];
    });
    return { status: 200, data: user };
  }

  return { status: 404, data: { error: 'User not found!?' } };
};
