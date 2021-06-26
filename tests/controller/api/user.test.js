const userApiController = require('../../../controller/api/user');

let req = null;
let res = null;

beforeEach(() => {
  req = {
    'app': app,
    'session': {},
    'params': {},
    'query': {},
    'body': {}
  };
  res = {
    'send': jest.fn()
  }
});


test('logging in with missing username and password', async () => {
  await userApiController.api_user_login_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'incomplete_request'
  });
  expect(req.session).not.toHaveProperty('username');
});


test('logging in with missing password', async () => {
  req.body = {
    'username': 'any-user-1'
  };

  await userApiController.api_user_login_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'incomplete_request'
  });
  expect(req.session).not.toHaveProperty('username');
});


test('logging in with unknown username', async () => {
  req.body = {
    'username': 'non-existing-user-1',
    'password': 'any-password'
  };

  await userApiController.api_user_login_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'no_such_user'
  });
  expect(req.session).not.toHaveProperty('username');
});


test('logging in with good username but wrong password', async () => {
  req.body = {
    'username': 'existing-user-1',
    'password': 'wrong-password'
  };

  await userApiController.api_user_login_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'wrong_password'
  });
  expect(req.session).not.toHaveProperty('username');
});


test('logging in with good username and password', async () => {
  req.body = {
    'username': 'existing-user-1',
    'password': 'existing-user-1-password'
  };

  await userApiController.api_user_login_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'success'
  });
  expect(req.session.username).toBe('existing-user-1');
});
