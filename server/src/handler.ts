const mapPost = {
  'login': require('./actions/post/login').login,
  'contacts': require('./actions/post/contacts').contacts,
  'users': require('./actions/post/users').users,
};
const mapPut = {
  'contacts': require('./actions/put/contacts').contacts,
  'users': require('./actions/put/users').users,
};
const mapDelete = {
  'contacts': require('./actions/delete/contacts').contacts,
  'users': require('./actions/delete/users').users,
};
const mapPatch = {
  'contacts': require('./actions/patch/contacts').contacts,
  'users': require('./actions/patch/users').users,
};
const ok = (data) => (data?.status ? data : { status: 200, data });
const result = async (action, data) => action ?
ok(await action(data.data)) :
{ status: 405, data: { error: `invalid action "${data.action}"` } };

export const handlePost = async function(data) {
  const action = mapPost[data.action];
  return result(action, data);
};

export const handlePut = async function(data) {
  const action = mapPut[data.action];
  return result(action, data);
};

export const handleDelete = async function(data) {
  const action = mapDelete[data.action];
  return result(action, data);
};

export const handlePatch = async function(data) {
  const action = mapPatch[data.action];
  return result(action, data);
};
