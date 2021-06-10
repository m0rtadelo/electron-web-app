import { getId } from '../../../../shared/uid';
import { contacts as model } from '../../model/contacts.model';

export const contacts = function(data: any) {
  if (model.some((item) => item.name === data.name && item.phone === data.phone && item.type === data.type)) {
    return { status: 409, data: { error: 'A contact with this data already exists!' } };
  };
  const pushed = { ...data, id: getId() };
  model.push(pushed);

  return { status: 201, data: pushed };
};
