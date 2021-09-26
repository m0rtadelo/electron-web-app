let hasCounter = undefined;
const holder = { hasCounter: undefined, id: -1 };
const mapPost = {
  'contacts': require('./actions/post/contacts').contacts,
  'users': require('./actions/post/users').users,
  'config': require('./actions/post/config').config,
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
const mapLogin = {
  'login': require('./actions/post/login').login,
};
const ok = (data) => (data?.status ? data : { status: 200, data });
const result = async (action, data) => action ?
ok(await action(data.data)) :
{ status: 405, data: { error: `invalid action "${data.action}"` } };
const sendMessage = (object, message, action = 'message', ws = undefined) => {
  const envelope = { action, verb: 'socket', data: { status: 200, message } };
  if (object) {
    if (object.reply) {
      object.reply('message', envelope);
    } else {
      if (ws) {
        ws.send(JSON.stringify(envelope));
      } else {
        object.clients.forEach(function each(client) {
          client.send(JSON.stringify(envelope));
        });
      }
    }
  }
};

export const handleLogin = async function(data) {
  const action = mapLogin[data.action];
  return result(action, data);
};

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

export const handleMessage = async function(event, data, ws = holder) {
  if (event && data === 'on') {
    event.reply('message', )
    sendMessage(event, 'on');
  }

  if (event && data === 'counter') {
    if (hasCounter) {
      sendMessage(event, false, 'counter');
      clearInterval(hasCounter);
      hasCounter = undefined;
    } else {
      let num = 0;
      sendMessage(event, true, 'counter');
      hasCounter = setInterval(() => {
        num++;
        sendMessage(event, 'counter on ' + num, 'counter');
      }, 10000);
    }
  }

  if (event && data === 'mycounter') {
    if (ws.hasCounter) {
      sendMessage(event, false, 'mycounter', ws);
      clearInterval(ws.hasCounter);
      ws.hasCounter = undefined;
    } else {
      let myNum = 0;
      sendMessage(event, true, 'mycounter', ws);
      ws.hasCounter = setInterval(() => {
        myNum++;
        sendMessage(event, 'counter on ' + myNum, 'mycounter', ws);
      }, 10000);
    }
  }
};
