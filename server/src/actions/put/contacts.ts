import { contacts as model } from '../../model/contacts.model';

export const contacts = function(data: any) {
  model.push(data);
  return data;
};
