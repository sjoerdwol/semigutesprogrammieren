function loginOnClick(username, password) {
    return login(username, password)
}

function login(username, password) {
    const usernameNotEmpty = username.length > 0
    const passwordNotEmpty = password.length > 0

    return usernameNotEmpty && passwordNotEmpty
}

function loginRequest(username, password) {
    var logReq = new XMLHttpRequest();
    const params = {
        username: username,
        password: password
    };
    logReq.open("POST", "/users/login");
    logReq.send(JSON.stringify(params));
    logReq.onLoad = () => {
        console.log(logReq.responseText);
    }
}

module.exports = login, loginOnClick
