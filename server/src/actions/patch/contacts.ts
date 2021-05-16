import { contacts as model } from '../../model/contacts.model';

export const contacts = function(data: any) {
  const contact = model.find((contact) => contact.id === data.id);
  return contact ? { status: 200, data: contact } : { status: 404, data: { error: 'Contact not found!?' } };
};
