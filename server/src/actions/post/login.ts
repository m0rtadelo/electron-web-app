import { users } from '../../model/users.model';

export const login = function({ user, pass }) {
  const element = { ...users.find((usr) => usr.user === user && usr.pass === pass), pass: undefined };
  return element || new Promise((res, rej) => {
    setTimeout(() => {
      res({ status: 401, data: { login: false } });
    }, 3000);
  });
};
