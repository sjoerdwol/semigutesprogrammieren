const indexController = require('../../controller/index');

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
    'send': jest.fn(),
    'redirect': jest.fn()
  }
});


test('visit index page while not logged in', async () => {
    await indexController.index_get(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/login');
});

test('visit index page while logged in', async () => {
    req.session = {
      'username': 'existing-user-1'
    };

    await indexController.index_get(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/books');
});
