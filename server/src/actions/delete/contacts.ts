import { contacts as model } from '../../model/contacts.model';

export const contacts = function(data: any) {
  for (let i=0; i<model.length; i++) {
    if (model[i].name === data.name) {
      model.splice(i, 1);
      return { status: 200 };
    }
  }

  return { status: 404, data: { error: 'Contact not found!?' } };
};
