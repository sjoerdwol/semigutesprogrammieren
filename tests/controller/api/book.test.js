const bookApiController = require('../../../controller/api/book');

let req = null;
let res = null;

beforeEach(() => {
  req = {
    'app': app,
    'session': {},
    'params': {},
    'query': {},
    'body': {}
  };
  res = {
    'send': jest.fn()
  }
});


test('trying to get a book with an empty ISBN', async () => {
  req.params = {
    'isbn': ''
  };

  await bookApiController.api_book_get(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'incomplete_request'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to get a non-existing book', async () => {
  req.params = {
    'isbn': 'non-existing-isbn-1'
  };

  await bookApiController.api_book_get(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'no_such_book'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to get an existing book', async () => {
  req.params = {
    'isbn': 'existing-isbn-1'
  };

  await bookApiController.api_book_get(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toMatchObject({
    'result': 'success'
  });
  expect(validateObjectWithSchema(parsed.data, bookSchema)).toBe(true);
});





test('trying to create a book with an empty ISBN', async () => {
  req.params = {
    'isbn': ''
  };
  req.body = {
    'isbn': '',
    'author': 'any-author',
    'title': 'any-title',
    'genre': 'any-genre',
    'year': 1234,
    'place': 'any-place'
  };

  await bookApiController.api_book_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'incomplete_request'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to create a non-existing book with an empty genre', async () => {
  req.params = {
    'isbn': 'non-existing-iban-1'
  };
  req.body = {
    'isbn': 'non-existing-iban-1',
    'author': 'non-existing-author-1',
    'title': 'non-existing-title-1',
    'genre': '',
    'year': 2001,
    'place': 'non-existing-place-1'
  };

  await bookApiController.api_book_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'incomplete_request'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to create a non-existing book with an ISBN mismatch', async () => {
  req.params = {
    'isbn': 'non-existing-isbn-1'
  };
  req.body = {
    'isbn': 'non-existing-isbn-2',
    'author': 'non-existing-author-2',
    'title': 'non-existing-title-2',
    'genre': 'non-existing-genre-2',
    'year': 2002,
    'place': 'non-existing-place-2'
  };

  await bookApiController.api_book_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'isbn_mismatch'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to create a book with a reserved ISBN', async () => {
  req.params = {
    'isbn': '_TEST'
  };
  req.body = {
    'isbn': '_TEST',
    'author': 'any-author',
    'title': 'any-title',
    'genre': 'any-genre',
    'year': 1234,
    'place': 'any-place'
  };

  await bookApiController.api_book_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'invalid_isbn'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to create an already existing book', async () => {
  req.params = {
    'isbn': 'existing-isbn-1'
  };
  req.body = {
    'isbn': 'existing-isbn-1',
    'author': 'existing-author-1',
    'title': 'existing-title-1',
    'genre': 'existing-genre-1',
    'year': 2001,
    'place': 'existing-place-1'
  };

  await bookApiController.api_book_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'already_exists'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to create a non-existing book', async () => {
  req.params = {
    'isbn': 'non-existing-isbn-1'
  };
  req.body = {
    'isbn': 'non-existing-isbn-1',
    'author': 'non-existing-author-1',
    'title': 'non-existing-title-1',
    'genre': 'non-existing-genre-1',
    'year': 2001,
    'place': 'non-existing-place-1'
  };

  await bookApiController.api_book_post(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'success'
  });
  expect(parsed).not.toHaveProperty('data');
});





test('trying to update a book with an empty ISBN', async () => {
  req.params = {
    'isbn': ''
  };
  req.body = {
    'isbn': '',
    'author': 'any-author',
    'title': 'any-title',
    'genre': 'any-genre',
    'year': 1234,
    'place': 'any-place'
  };

  await bookApiController.api_book_put(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'incomplete_request'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to update an existing book with an empty genre', async () => {
  req.params = {
    'isbn': 'existing-iban-1'
  };
  req.body = {
    'isbn': 'existing-iban-1',
    'author': 'existing-author-1',
    'title': 'existing-title-1',
    'genre': '',
    'year': 2001,
    'place': 'existing-place-1'
  };

  await bookApiController.api_book_put(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'incomplete_request'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to update an existing book with an ISBN mismatch', async () => {
  req.params = {
    'isbn': 'existing-isbn-1'
  };
  req.body = {
    'isbn': 'existing-isbn-2',
    'author': 'existing-author-2',
    'title': 'existing-title-2',
    'genre': 'existing-genre-2',
    'year': 2002,
    'place': 'existing-place-2'
  };

  await bookApiController.api_book_put(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'isbn_mismatch'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to update a non-existing book', async () => {
  req.params = {
    'isbn': 'non-existing-isbn-1'
  };
  req.body = {
    'isbn': 'non-existing-isbn-1',
    'author': 'non-existing-author-1',
    'title': 'non-existing-title-1',
    'genre': 'non-existing-genre-1',
    'year': 2001,
    'place': 'non-existing-place-1'
  };

  await bookApiController.api_book_put(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'no_such_book'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to update an already existing book', async () => {
  req.params = {
    'isbn': 'existing-isbn-1'
  };
  req.body = {
    'isbn': 'existing-isbn-1',
    'author': 'existing-author-1',
    'title': 'existing-title-1',
    'genre': 'existing-genre-1',
    'year': 2001,
    'place': 'existing-place-1'
  };

  await bookApiController.api_book_put(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'success'
  });
  expect(parsed).not.toHaveProperty('data');
});





test('trying to delete a book with an empty ISBN', async () => {
  req.params = {
    'isbn': ''
  };

  await bookApiController.api_book_delete(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'incomplete_request'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to delete a non-existing book', async () => {
  req.params = {
    'isbn': 'non-existing-isbn-1'
  };

  await bookApiController.api_book_delete(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'no_such_book'
  });
  expect(parsed).not.toHaveProperty('data');
});


test('trying to delete an already existing book', async () => {
  req.params = {
    'isbn': 'existing-isbn-1'
  };

  await bookApiController.api_book_delete(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed).toStrictEqual({
    'result': 'success'
  });
  expect(parsed).not.toHaveProperty('data');
});
