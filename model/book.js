class Book {
  constructor(isbn, author, title, genre, year, place) {
    this.id = isbn;
    this.data = {
      'isbn': isbn,
      'author': author,
      'title': title,
      'genre': genre,
      'year': year,
      'place': place
    }
  }
}

module.exports = Book;
