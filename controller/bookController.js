const Book = require("../model/book");

exports.book_get_get = function(req, res) {
    const db = req.app.locals.db;
    const sess = req.session;

    const isbn = req.body.isbn;

    if (!sess.username) {
      res.send("401");
      return;
    }
    // TODO check if username exists in DB (could have been deleted in the meantime)

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

exports.book_set_post = function(req, res) {
    const db = req.app.locals.db;
    const sess = req.session;

    const isbn = req.body.isbn;
    const author = req.body.author;
    const title = req.body.title;
    const genre = req.body.genre;
    const year = req.body.year;
    const place = req.body.place;

    if (!sess.username) {
      res.send("401");
      return;
    }
    // TODO check if username exists in DB (could have been deleted in the meantime)

    console.log(req.body);

    let book = new Book(db, isbn, author, title, genre, year, place);

    book.storeInDatabase().then((response) => {
      console.log("response: " + response);
      // TODO handle errors
    });

};
