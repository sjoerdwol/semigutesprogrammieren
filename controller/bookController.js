const Book = require("../model/book");

exports.book_get_get = function(req, res) {
    const db = req.app.locals.db;
    const isbn = req.body.isbn;

    console.log(req.body);

    Book.loadFromDatabase(db, isbn).then((response) => {
      console.log("response: " + response);
        if (!response) {
            res.send('{}}');
        } else {
            res.send(JSON.stringify(response));
        }
    });

};
