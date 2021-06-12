function loginOnClick(username, password) {
    if (!login(username, password)){
        return false
    } else {
        return loginRequest(username, password)
    }
}

function login(username, password) {
    const usernameNotEmpty = username.length > 0
    const passwordNotEmpty = password.length > 0

    return usernameNotEmpty && passwordNotEmpty
}

function loginRequest(username, password) {
    var logReq = new XMLHttpRequest();
    let params = '?username='+username+'&password='+password;
    logReq.open("POST", "/users/login");
    logReq.send(params);
    logReq.onLoad = () => {
        console.log(logReq.responseText);
    return(logReq.responseText);
    }
}

module.exports = { login, loginOnClick, loginRequest };
