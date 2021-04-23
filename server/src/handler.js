const map = {
    'login': require('./actions/login').login
}
const ok = (data) => (data.status ? data : { status: 200, data });

module.exports.handle = async function (data) {
    return await map[data.action] ?
        ok(map[data.action](data.data)) :
        { status: 500, data: { error: `invalid action "${data.action}"` }};
}