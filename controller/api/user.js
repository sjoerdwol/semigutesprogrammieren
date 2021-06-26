exports.user_login_post = function(req, res) {
    const db = req.app.locals.db;
    const sess = req.session;
    
    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body);

    db.getUser(username).then((response) => {
        if (!response.exists) {
            res.send('No such user');
        } else if (response.data().password != password) {
            res.send('Wrong password entered');
        } else {
            sess.username = username;
            res.send('Validation successful');
        }
    });

};
