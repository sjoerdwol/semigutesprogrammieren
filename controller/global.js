async function requireLoggedIn(req, res, next) {
  if (!await isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
}

async function requireNotLoggedIn(req, res, next) {
  if (await isLoggedIn(req)) {
    res.redirect('/');
  } else {
    next();
  }
}

async function isLoggedIn(req) {
  const db = req.app.locals.db;
  const sess = req.session;

  if (!sess.username) {
    return false;
  }

  const user = await db.getUser(sess.username);
  if (user && user.id && user.id == sess.username) {
    return true;
  } else {
    return false;
  }
}

module.exports = { requireLoggedIn, requireNotLoggedIn, isLoggedIn };
