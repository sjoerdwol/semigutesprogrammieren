var admin = require("firebase-admin");

var serviceAccount = require("./secret/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://semigutesprogrammieren.firebaseio.com'
});

let _db = "";

class DB {
    constructor(){
        _db = admin.firestore();
    }
}

module.exports = DB;
