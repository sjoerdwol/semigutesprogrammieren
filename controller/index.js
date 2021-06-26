async function index_get(req, res) {
  const sess = req.session;

  if (!sess.username) {
    res.redirect('/login');
  } else {
    res.redirect('/books');
  }
}

module.exports = { index_get };
