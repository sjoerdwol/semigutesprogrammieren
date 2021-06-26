const Book = require('../../model/book');

/* Get list of all books */
async function api_books_get(req, res) {
  const db = req.app.locals.db;
  const sess = req.session;

  const response = {};

  response.result = 'success';
  response.data = [];
  // TODO error handling
  const books = await db.getBooks();
  books.forEach(book => {
    response.data.push(book.data);
  });
  res.send(JSON.stringify(response));
};

module.exports = { api_books_get };
