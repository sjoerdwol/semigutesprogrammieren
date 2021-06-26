/* Validate user credentials and assign user to current session */
async function api_user_login_post(req, res) {
  const db = req.app.locals.db;
  const sess = req.session;

  const username = req.body.username;
  const password = req.body.password;

  const response = {};

  if (!username || !password) {
    response.result = 'incomplete_request';
  } else {
    const dbUser = await db.getUser(username);
    if (!dbUser) {
      response.result = 'no_such_user';
    } else if (dbUser.data.password != password) {
      response.result = 'wrong_password';
    } else {
      sess.username = username;
      response.result = 'success';
    }
  }
  res.send(JSON.stringify(response));
};

module.exports = { api_user_login_post };
