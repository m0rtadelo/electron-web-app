module.exports.login = function({user, pass}) {
    if (user === 'user' && pass === 'pass') {
      return { status: 200, data: { user: 'user', id: 1 } };
    }
    if (user === 'admin' && pass === 'pass') {
      return { status: 200, data: { user: 'admin', id: 2 } };
  }
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ status: 401, data: { login: false }});
    }, 3000);
  })
}