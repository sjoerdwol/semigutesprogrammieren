const globalController = require('./global');

async function index_get(req, res) {
  if (!await globalController.isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    res.redirect('/books');
  }
}

module.exports = { index_get };
