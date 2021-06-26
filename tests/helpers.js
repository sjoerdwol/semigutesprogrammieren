const User = require('../model/user');
const Book = require('../model/book');

global.app = {
  'locals': {
    'db': {
      'getUser': async username => {
        if (username && username.length > 14 && username.substring(0, 14) == 'existing-user-') {
          return new User(username, username + '-password');
        } else {
          return null;
        }
      },
      'getBooks': async () => {
        const books = [];
        for (let i = 1; i <= 99; i++) {
          const isbn = 'existing-isbn-' + i;
          books.push(new Book(isbn, isbn + '-author', isbn + '-title', isbn + '-genre', 2000 + i, isbn + '-place'));
        }
        return books;
      },
      'getBook': async isbn => {
        if (isbn && isbn.length > 14 && isbn.substring(0, 14) == 'existing-isbn-') {
          return new Book(isbn, isbn + '-author', isbn + '-title', isbn + '-genre', 2000, isbn + '-place');
        } else {
          return null;
        }
      },
      'setBook': async (isbn, bookData) => {
        if (!isbn || !bookData || isbn != bookData.isbn) {
          return false;
        }
        return true;
      },
      'deleteBook': async isbn => {
        if (!isbn) {
          return false;
        }
        return true;
      }
    }
  }
};

global.bookSchema = {
  'isbn': 'string',
  'author': 'string',
  'title': 'string',
  'genre': 'string',
  'year': 'number',
  'place': 'string'
};

global.arrayContainsOnlyObjectsWithSchema = (arr, schema) => {
  if (!Array.isArray(arr) || typeof schema !== 'object' || schema === null) {
    return false;
  }

  let result = true;
  arr.forEach(el => {
    if (result) {
      result = result && validateObjectWithSchema(el, schema);
    }
  });
  return result;
};

global.validateObjectWithSchema = (obj, schema) => {
  if (typeof obj !== 'object' || obj === null || typeof schema !== 'object' || schema === null) {
    return false;
  }
	let result = true;
	Object.keys(schema).forEach(key => {
    if (result) {
      if (typeof obj[key] === 'object') {
        result = result && validateObjectWithSchema(obj[key], schema[key]);
      } else if (!(typeof obj[key] === schema[key])) {
        result = false;
      }
    }
  });
  return result;
};
