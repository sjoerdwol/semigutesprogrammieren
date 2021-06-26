async function loginOnClick(button) {
  const loginForm = button.parentNode.parentNode;
  const responseDiv = loginForm.querySelector("#response");
  const username = loginForm.querySelector("input[name='username']").value;
  const password = loginForm.querySelector("input[name='password']").value;

  if (!loginForm.checkValidity()) {
    responseDiv.innerText = "Bitte alle Felder ausfüllen!";
    return;
  }

  responseDiv.innerText = "Bitte warten…";
  const response = await doLogin(username, password);

  if (!response || !response.result) {
    responseDiv.innerText = "Unbekannter Fehler beim Einloggen (1)!";
    return false;
  } else if (response.result != "success") {
    if (response.result == "no_such_user") {
      responseDiv.innerText = "Benutzer nicht gefunden!";
    } else if (response.result == "wrong_password") {
      responseDiv.innerText = "Falsches Passwort eingegeben!";
    } else {
      responseDiv.innerText = "Unbekannter Fehler beim Einloggen (2)!";
    }
    return false;
  }

  // login successful
  window.location.href = "/books";
}





function doLogin(username, password) {
  const request = new XMLHttpRequest();
  const params = {
    "username": username,
    "password": password
  }
  request.open("POST", "/api/user/login");
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(params));
  return new Promise((resolve, reject) => {
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(request.responseText));
      }
    };
  });
}
