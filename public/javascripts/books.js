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
