exports.users_login_post = function(req, res) {
    const doc = req.app.locals.db.getUser(req.query.username);
    if (doc == null){
        res.send('No such user');
    } else if (doc.data().password != req.query.password){
        res.send('Wrong password entered');
    } else {
        res.send('Validation succesful!');
    }
};
