function loginOnClick(username, password) {
    return login(username, password)
}

function login(username, password) {
    const usernameNotEmpty = username.length > 0
    const passwordNotEmpty = password.length > 0

    return usernameNotEmpty && passwordNotEmpty
}

module.exports = login, loginOnClick
