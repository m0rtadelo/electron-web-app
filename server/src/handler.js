const map = {
    'login': require('./actions/login').login
}
const ok = (data) => (data.status ? data : { status: 200, data });
const result = async (action, data) => action ?
ok(await action(data.data)) :
{ status: 405, data: { error: `invalid action "${data.action}"` }};

module.exports.handlePost = async function (data) {
    const action = map[data.action];
    return result(action, data);
}