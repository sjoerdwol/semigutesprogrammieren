const admin = require('firebase-admin');
const serviceAccount = require('./secret/serviceAccountKey.json');

const User = require('./model/user');
const Book = require('./model/book');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://semigutesprogrammieren.firebaseio.com'
});

class Db {
  constructor() {
    this.db = admin.firestore();
  }

  async getUser(username) {
    if (!username) {
      return null;
    }
    const response = await this.db.collection('users').doc(username).get();
    if (!response.exists) {
      return null;
    } else {
      const username = response.id;
      const userData = response.data();
      const user = new User(username, userData.password);
      return user;
    }
  }

  async getBooks() {
    const response = await this.db.collection('books').get();
    const books = [];
    response.forEach(item => {
      const bookData = item.data();
      const book = new Book(item.id, bookData.author, bookData.title, bookData.genre, bookData.year, bookData.place);
      books.push(book);
    });
    return books;
  }

  async getBook(isbn) {
    if (!isbn) {
      return null;
    }
    const response = await this.db.collection('books').doc(isbn).get();
    if (!response.exists) {
      return null;
    } else {
      const isbn = response.id;
      const bookData = response.data();
      const book = new Book(isbn, bookData.author, bookData.title, bookData.genre, bookData.year, bookData.place);
      return book;
    }
  }

  async setBook(isbn, bookData) {
    if (!isbn || !bookData || isbn != bookData.isbn) {
      return false;
    }
    await this.db.collection('books').doc(isbn).set(bookData);
    return true; // TODO error handling
  }

  async deleteBook(isbn) {
    if (!isbn) {
      return false;
    }
    await this.db.collection('books').doc(isbn).delete();
    return true; // TODO error handling
  }
}

module.exports = Db;
