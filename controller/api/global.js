const globalController = require('../global');

async function requireLoggedIn(req, res, next) {
  if (!await globalController.isLoggedIn(req)) {
    response = {};
    response.result = 'unauthenticated';
    res.send(JSON.stringify(response));
  } else {
    next();
  }
}

module.exports = { requireLoggedIn };
