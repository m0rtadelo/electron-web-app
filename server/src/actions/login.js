module.exports.login = function({user, pass}) {
    if (user === 'user' && pass === 'pass') {
        return { status: 200, data: { user: 'user', id: 1 } };
    }
    return { status: 401, data: { login: false }};
}