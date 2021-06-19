function loginOnClick(username, password) {
    if (!loginValidate(username, password)){
        return false
    } else {
        return loginRequest(username, password);
    }
}

function loginValidate(username, password) {
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
    logReq.setRequestHeader("Content-Type", "application/json");
    logReq.send(JSON.stringify(params));
    logReq.onLoad = () => {
        console.log("response: " + logReq.responseText);
        const responseDiv = document.getElementById("response");
        response = logReq.responseText;
        if (response == 'Validation successful') {
          responseDiv.innerText = "Bitte warten...";
          window.location.href = '/books.html';
        } else if (response == 'Wrong password entered') {
          responseDiv.innerText = "Falsches Passwort eingegeben!";
        } else if (response == 'No such user') {
          responseDiv.innerText = "Benutzer nicht gefunden!";
        } else {
          responseDiv.innerText = "Unbekannter Fehler!";
        }
    }
}
