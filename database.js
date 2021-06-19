var admin = require("firebase-admin");

var serviceAccount = require("./secret/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://semigutesprogrammieren.firebaseio.com'
});

let _db = "";

class DB {
    constructor() {
        _db = admin.firestore();
    }

    getUser(username) {
        return _db.collection("users").doc(username).get();
    }

    getBooks(){
        return _db.collection("books").get();
    }

    getBook(id){
        return _db.collection("books").doc(id).get();
    }

    editBook(id, book){
        return _db.collection("books").doc(id).update(book);
    }

    deleteBook(id){
        return _db.collection("books").doc(id).delete();
    }

    addBook(book){
        return _db.collection("books").add(book);
    }
}

module.exports = DB;
