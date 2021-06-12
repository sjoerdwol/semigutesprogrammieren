exports.users_login_post = function(req, res) {
    const db = req.app.locals.db;
    const username = req.body.username;
    const password = req.body.username;

    console.log(req.body);

    db.getUser(username).then((response) => {
        if (!response.exists) {
            res.send('No such user');
        } else if (response.data().password != password){
            res.send('Wrong password entered');
        } else {
            res.send('Validation succesful!');
        }
    });

};
