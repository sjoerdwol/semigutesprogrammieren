const booksApiController = require('../../../controller/api/books');

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

test('retrieving all books', async () => {
  await booksApiController.api_books_get(req, res);

  expect(res.send).toHaveBeenCalledTimes(1);
  let parsed = undefined;
  expect(() => {
    parsed = JSON.parse(res.send.mock.calls[0][0]);
  }).not.toThrow();
  expect(parsed.result).toBe('success');
  expect(Array.isArray(parsed.data)).toBe(true);
  expect(arrayContainsOnlyObjectsWithSchema(parsed.data, bookSchema)).toBe(true);
});
