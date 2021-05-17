import { contacts as model } from '../../model/contacts.model';

export const contacts = function(data: any) {
  const keys = Object.keys(data);
  const contact = model.find((contact) => contact.id === data.id);
  if (contact) {
    keys.forEach((key) => {
      contact[key] = data[key];
    });
    return { status: 200, data: contact };
  }

  return { status: 404, data: { error: 'Contact not found!?' } };
};
