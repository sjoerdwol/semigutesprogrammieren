class User {
  constructor(username, password) {
    this.id = username;
    this.data = {
      'username': username,
      'password': password
    }
  }
}

module.exports = User;
