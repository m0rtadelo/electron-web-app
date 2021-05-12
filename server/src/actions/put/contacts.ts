import { contacts as model } from '../../model/contacts.model';

export const contacts = function(data: any) {
  if (model.some((item) => item.name === data.name && item.phone === data.phone && item.type === data.type)) {
    return { status: 409, data: { error: 'A contact with this data already exists!' } };
  };
  model.push(data);

  return { status: 201, data };
};
