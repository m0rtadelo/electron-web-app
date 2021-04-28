const map = {
    'login': require('./actions/login').login
}
const ok = (data) => (data.status ? data : { status: 200, data });

module.exports.handle = async function (data) {
    const action = map[data.action];
    return action ?
        ok(await action(data.data)) :
        { status: 405, data: { error: `invalid action "${data.action}"` }};
}