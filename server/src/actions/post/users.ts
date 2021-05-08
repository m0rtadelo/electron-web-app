import { users as model } from '../../model/users.model';

export const users = function(data: any) {
  const result = model.map((i) => ({ ...i, pass: undefined }));
  return result;
};
