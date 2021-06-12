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
}

module.exports = DB;
