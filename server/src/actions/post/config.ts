import { users as model } from '../../model/users.model';
import { Files } from '../../utils/files';

export const config = function() {
  Files.readJson(Files.config());
  const result = model.map((i) => ({ ...i, pass: undefined }));
  return result;
};
