class Book {

  _constructor(db, isbn, author, title, genre, year, place) {
    this.db = db;
    this.isbn = isbn;
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.year = year;
    this.place = place;
  }

  static loadFromDatabase(db, isbn) {
    return new Promise(function(resolve, reject) {
      db.getBook(isbn).then((response) => {
        if (!response.exists) {
          resolve(null);
        } else {
          const dbBook = response.data();
          resolve(new Book(db, isbn, dbBook.author, dbBook.title, dbBook.genre, dbBook.year, dbBook.place));
        }
      });
    });
  }

  storeInDatabase() {
    return new Promise(function(resolve, reject) {
      //db.setBook(this.isbn, {this.author, this.title, this.genre, this.year, this.place }).then((response) => {
        resolve();
      });
    }
  }


module.exports = Book;
