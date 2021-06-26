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

  getBooks() {
    return _db.collection("books").get();
  }

  getBook(isbn) {
    return _db.collection("books").doc(isbn).get();
  }

  setBook(isbn, book) {
    return _db.collection("books").doc(isbn).set(book);
  }

  deleteBook(isbn) {
    return _db.collection("books").doc(isbn).delete();
  }
}

module.exports = Db;
