exports.users_login_post = function(req, res) {
    const db = req.app.locals.db;
    const username = req.body.username;
    const password = req.body.password;
    const sess = req.session;

    console.log(req.body);

    db.getUser(username).then((response) => {
        if (!response.exists) {
            res.send('No such user');
        } else if (response.data().password != password) {
            res.send('Wrong password entered');
        } else {
            sess.username = username;
            res.send('Validation succesful!');
        }
    });

};
