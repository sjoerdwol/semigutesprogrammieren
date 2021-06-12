exports.users_login_post = function(req, res) {
    req.app.locals.db.getUser(req.query.username).then((response) => {
        if (!response.exists) {
            res.send('No such user');
        } else if (response.data().password != req.query.password){
            res.send('Wrong password entered');
        } else {
            res.send('Validation succesful!');
        }
    });

};
