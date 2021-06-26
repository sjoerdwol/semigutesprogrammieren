async function refreshBooks() {
  const loadingDiv = document.querySelector("#loading");
  const refreshButton = document.querySelector("#refresh");
  const booksTable = document.querySelector("#books");
  const booksTableBody = booksTable.querySelector("tbody");
  const bookTemplate = document.querySelector("#book-template");

  refreshButton.classList.add("hidden");
  loadingDiv.classList.remove("hidden");

  const response = await getBooks();
  if (!response || !response.result) {
    alert("Unbekannter Fehler beim Laden der Bücher (1)!");
    return;
  } else if (response.result != "success") {
    if (response.result == "unauthenticated") {
      alert("Sitzung abgelaufen, bitte neu anmelden!");
      window.location.href = "/login";
    } else {
      alert("Unbekannter Fehler beim Laden der Bücher (2)!");
    }
    return;
  }

  booksTable.classList.add("hidden");
  while (booksTableBody.firstChild) {
    booksTableBody.removeChild(booksTableBody.lastChild);
  }
  response.data.forEach(book => {
    const newBook = document.importNode(bookTemplate.content.querySelector("tr"), true);
    newBook.dataset.isbn = book.isbn;
    newBook.dataset.author = book.author;
    newBook.dataset.title = book.title;
    newBook.dataset.author = book.author;
    newBook.dataset.genre = book.genre;
    newBook.dataset.year = book.year;
    newBook.dataset.place = book.place;
    newBook.querySelector(".isbn").textContent = book.isbn;
    newBook.querySelector(".title").textContent = book.title;
    newBook.querySelector(".author").textContent = book.author;
    booksTableBody.appendChild(newBook);
  });
  booksTable.classList.remove("hidden");
  loadingDiv.classList.add("hidden");
  refreshButton.classList.remove("hidden");
}


async function editOnClick(button) {
  const booksTable = document.querySelector("#books");
  const editTemplate = document.querySelector("#edit-template");

  const tableRow = button.parentNode.parentNode;
  const isbn = tableRow.dataset.isbn;

  if (removeEditPanes(isbn)) {
    return false; // if already opened, just close
  }

  const editPane = document.importNode(editTemplate.content.querySelector("tr"), true);
  const form = editPane.querySelector("form");
  const saveButton = editPane.querySelector("button[name='save']");
  editPane.dataset.isbn = isbn;

  if (isbn != "_CREATE") {
    const response = await getBook(isbn);

    if (!response || !response.result) {
      alert("Unerwarteter Fehler beim Laden des Buchs!");
      return false;
    } else {
      if (response.result != "success") {
        if (response.result == "unauthenticated") {
          alert("Sitzung abgelaufen, bitte neu anmelden!");
          window.location.href = "/login";
        } else if (response.result == "no_such_book") {
          alert("Das gewünschte Buch existiert nicht (mehr)!");
          tableRow.parentNode.removeChild(tableRow);
        } else {
          alert("Unerwarteter Fehler beim Laden des Buchs: " + response.result);
        }
        return false;
      }
    }
    const book = response.data;

    editPane.querySelector("input[name='isbn']").disabled = true;
    editPane.querySelector("input[name='isbn']").value = book.isbn;
    editPane.querySelector("input[name='author']").value = book.author;
    editPane.querySelector("input[name='title']").value = book.title;
    editPane.querySelector("input[name='genre']").value = book.genre;
    editPane.querySelector("input[name='year']").value = book.year;
    editPane.querySelector("input[name='place']").value = book.place;
  }

  insertAfter(tableRow, editPane);
  return editPane;
}


async function deleteOnClick(button) {
  const tableRow = button.parentNode.parentNode;
  const isbn = tableRow.dataset.isbn;
  const title = tableRow.querySelector(".title").textContent;

  const decision = window.confirm("Soll das Buch mit dem Titel \"" + title + "\" (" + isbn + ") wirklich gelöscht werden?");
  if (decision) {
    removeEditPanes(isbn);
    await deleteBook(isbn);
    refreshBooks();
  }
}


async function saveOnClick(button) {
  const editPane = button.parentNode.parentNode.parentNode.parentNode.parentNode;
  const form = button.parentNode.parentNode;
  const isbn = editPane.dataset.isbn;
  const responseDiv = form.querySelector("#response");
  const cancelButton = form.querySelector("button[name='cancel']");

  const input = {
    "isbn": form.querySelector("input[name='isbn']").value,
    "author": form.querySelector("input[name='author']").value,
    "title": form.querySelector("input[name='title']").value,
    "genre": form.querySelector("input[name='genre']").value,
    "year": form.querySelector("input[name='year']").value,
    "place": form.querySelector("input[name='place']").value
  };

  if (input.isbn.charAt(0) == "_") {
    // protect reserved ISBNs (specific to this project)
    // TODO add real validation and feedback
    return;
  }
  if (isbn != "_CREATE" && input.isbn != isbn) {
    return; // form manipulation detected
  }

  if (!form.checkValidity()) {
    responseDiv.innerText = "Bitte alle Felder ausfüllen!";
    return;
  }

  responseDiv.innerText = "Bitte warten…";
  button.disabled = true;
  cancelButton.disabled = true;
  form.querySelectorAll("input").forEach(input => {
    input.disabled = true;
  });

  let response = false;
  if (isbn == "_CREATE") {
    response = await createBook(input.isbn, input);
  } else {
    response = await editBook(isbn, input);
  }

  if (response && response.result) {
    if (response.result == "success") {
      removeEditPanes(isbn);
      refreshBooks();
    } else {
      if (response.result == "already_exists") {
        responseDiv.innerText = "Ein Buch mit dieser ISBN existiert bereits!";
      } else if (response.result == "no_such_book") {
        responseDiv.innerText = "Ein Buch mit dieser ISBN existiert nicht (mehr)!";
      } else {
        responseDiv.innerText = "Unerwarteter Fehler beim Speichern des Buchs: " + response.result;
      }
    }
    button.disabled = false;
    cancelButton.disabled = false;
    form.querySelectorAll("input").forEach(input => {
      input.disabled = false;
    });
  } else {
    responseDiv.innerText = "Unerwarteter Fehler beim Speichern des Buchs!";
  }
}


function cancelOnClick(button) {
  const editPane = button.parentNode.parentNode;
  const isbn = editPane.dataset.isbn;

  removeEditPanes(isbn);
}


function removeEditPanes(isbn = false) {
  const booksTable = document.querySelector("#books");

  let count = 0;
  booksTable.querySelectorAll(".edit").forEach(row => {
    if (!isbn || row.dataset.isbn == isbn) {
      row.parentNode.removeChild(row);
      count++;
    }
  });
  return count;
}





function getBooks() {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", "/api/books");
    request.send();
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(request.responseText));
      }
    };
  });
}

function getBook(isbn) {
  return new Promise((resolve, reject) => {
    if (!isbn) {
      resolve(false);
      return;
    }
    const request = new XMLHttpRequest();
    request.open("GET", "/api/book/" + isbn);
    request.send();
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(request.responseText));
      }
    };
  });
}


function createBook(isbn, book) {
  return new Promise((resolve, reject) => {
    if (!isbn || !book || !book.isbn || book.isbn != isbn) {
      resolve(false);
      return;
    }
    const request = new XMLHttpRequest();
    request.open("POST", "/api/book/" + isbn);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(book));
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(request.responseText));
      }
    };
  });
}


function editBook(isbn, book) {
  return new Promise((resolve, reject) => {
    if (!isbn || !book || !book.isbn || book.isbn != isbn) {
      resolve(false);
      return;
    }
    const request = new XMLHttpRequest();
    request.open("PUT", "/api/book/" + isbn);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(book));
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(request.responseText));
      }
    };
  });
}


function deleteBook(isbn) {
  return new Promise((resolve, reject) => {
    if (!isbn) {
      resolve(false);
      return;
    }
    const request = new XMLHttpRequest();
    request.open("DELETE", "/api/book/" + isbn);
    request.send();
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(request.responseText));
      }
    };
  });
}
