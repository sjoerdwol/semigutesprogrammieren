const Book = require('../../model/book');

/* Get existing book */
async function api_book_get(req, res) {
  const db = req.app.locals.db;
  const sess = req.session;

  const isbn = req.params.isbn;

  const response = {};

  // validate request
  if (!isbn) {
    response.result = 'incomplete_request';
    res.send(JSON.stringify(response));
    return;
  }

  let book = await db.getBook(isbn);
  if (!book) {
    response.result = 'no_such_book';
    res.send(JSON.stringify(response));
    return;
  }

  response.result = 'success';
  // TODO handle errors
  response.data = book.data;
  res.send(JSON.stringify(response));
};


/* Create new book */
async function api_book_post(req, res) {
  const db = req.app.locals.db;
  const sess = req.session;

  const isbnParam = req.params.isbn;
  const isbn = req.body.isbn;
  const author = req.body.author;
  const title = req.body.title;
  const genre = req.body.genre;
  const year = req.body.year;
  const place = req.body.place;

  const response = {};

  // validate request
  if (!isbn || !author || !title || !genre || !year || !place) {
    response.result = 'incomplete_request';
    res.send(JSON.stringify(response));
    return;
  } else if (isbnParam != isbn) {
    response.result = 'isbn_mismatch';
    res.send(JSON.stringify(response));
    return;
  } else if (isbn.charAt(0) == '_') {
    // protect reserved ISBNs (specific to this project)
    // TODO add real validation
    response.result = 'invalid_isbn';
    res.send(JSON.stringify(response));
    return;
  }

  // check for existing book
  let existingBook = await db.getBook(isbn);
  if (existingBook) {
    response.result = 'already_exists';
    res.send(JSON.stringify(response));
    return;
  }

  let book = new Book(isbn, author, title, genre, year, place);
  await db.setBook(isbn, book.data);
  response.result = 'success';
  // TODO handle errors
  res.send(JSON.stringify(response));
};


/* Update existing book */
async function api_book_put(req, res) {
  const db = req.app.locals.db;
  const sess = req.session;

  const isbnParam = req.params.isbn;
  const isbn = req.body.isbn;
  const author = req.body.author;
  const title = req.body.title;
  const genre = req.body.genre;
  const year = req.body.year;
  const place = req.body.place;

  const response = {};

  // validate request
  if (!isbn || !author || !title || !genre || !year || !place) {
    response.result = 'incomplete_request';
    res.send(JSON.stringify(response));
    return;
  }
  if (isbnParam != isbn) {
    response.result = 'isbn_mismatch';
    res.send(JSON.stringify(response));
    return;
  }

  // check for existing book
  let existingBook = await db.getBook(isbn);
  if (!existingBook) {
    response.result = 'no_such_book';
    res.send(JSON.stringify(response));
    return;
  }

  let book = new Book(isbn, author, title, genre, year, place);
  await db.setBook(isbn, book.data);
  response.result = 'success';
  // TODO handle errors
  res.send(JSON.stringify(response));
};


/* Delete existing book */
async function api_book_delete(req, res) {
  const db = req.app.locals.db;
  const sess = req.session;

  const isbn = req.params.isbn;

  const response = {};

  // validate request
  if (!isbn) {
    response.result = 'incomplete_request';
    res.send(JSON.stringify(response));
    return;
  }

  // check for existing book
  let existingBook = await db.getBook(isbn);
  if (!existingBook) {
    response.result = 'no_such_book';
    res.send(JSON.stringify(response));
    return;
  }

  await db.deleteBook(isbn);
  response.result = 'success';
  // TODO handle errors
  res.send(JSON.stringify(response));
};

module.exports = { api_book_get, api_book_post, api_book_put, api_book_delete };
