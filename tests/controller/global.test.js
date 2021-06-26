const globalController = require('../../controller/global');

let req = null;
let res = null;
let next = null;

beforeEach(() => {
  req = {
    'app': app,
    'session': {},
    'params': {},
    'query': {},
    'body': {}
  };
  res = {
    'send': jest.fn(),
    'redirect': jest.fn()
  };
  next = jest.fn();
});

const sessNoUser = {};

const sessExistingUser = {
  'username': 'existing-user-1'
};

const sessNonExistingUser = {
  'username': 'non-existing-user-1'
};


test('isLoggedIn(...) when not logged in', async () => {
  req.session = sessNoUser;
  expect(await globalController.isLoggedIn(req)).toBe(false);
});


test('isLoggedIn(...) when correctly logged in', async () => {
  req.session = sessExistingUser;
  expect(await globalController.isLoggedIn(req)).toBe(true);
});


test('isLoggedIn(...) when logged in with non-existing user', async () => {
  req.session = sessNonExistingUser;
  expect(await globalController.isLoggedIn(req)).toBe(false);
});


test('requireLoggedIn() when not logged in', async () => {
  req.session = sessNoUser;

  await globalController.requireLoggedIn(req, res, next);

  expect(res.redirect).toHaveBeenCalledTimes(1);
  expect(res.redirect).toHaveBeenCalledWith('/login');
  expect(next).not.toHaveBeenCalled();
});

test('requireLoggedIn() when logged in', async () => {
  req.session = sessExistingUser;

  await globalController.requireLoggedIn(req, res, next);

  expect(res.redirect).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledTimes(1);
});

test('requireNotLoggedIn() when not logged in', async () => {
  req.session = sessNoUser;

  await globalController.requireNotLoggedIn(req, res, next);

  expect(res.redirect).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledTimes(1);
});

test('requireNotLoggedIn() when logged in', async () => {
  req.session = sessExistingUser;

  await globalController.requireNotLoggedIn(req, res, next);

  expect(res.redirect).toHaveBeenCalledTimes(1);
  expect(res.redirect).toHaveBeenCalledWith('/');
  expect(next).not.toHaveBeenCalled();
});
