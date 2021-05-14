import { users as model } from '../../model/users.model';

export const users = function(data: any) {
  for (let i=0; i<model.length; i++) {
    if (model[i].id === data.id) {
      model.splice(i, 1);
      return { status: 200 };
    }
  }

  return { status: 404, data: { error: 'User not found!?' } };
};
