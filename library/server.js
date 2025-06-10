let myLibrary = [];
const container = document.querySelector(".container");

function Book(title, author, read) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, read) {
  const newBook = new Book(title, author, read);
  myLibrary.push(newBook);
  return newBook;
}

function attachEventListeners(bookElement) {
  const removeBtn = bookElement.querySelector(".remove");
  const readBtn = bookElement.querySelector(".read");
  const id = bookElement.dataset.id;

  removeBtn.addEventListener("click", () => {
    myLibrary = myLibrary.filter((book) => book.id !== id);
    bookElement.remove();
    console.log("Book removed. Current library:", myLibrary);
  });

  readBtn.addEventListener("click", () => {
    myLibrary = myLibrary.map((book) => {
      if (book.id === id) {
        book.read = !book.read;
      }
      return book;
    });

    const updatedBook = myLibrary.find((book) => book.id === id);
    const readStatus = bookElement.querySelector(".read-status");
    readStatus.innerHTML = `Book is read: ${updatedBook.read}`;
    readStatus.className = `read-status ${
      updatedBook.read ? "read-true" : "read-false"
    }`;

    console.log("Book updated:", updatedBook);
  });
}

function createBookElement(book) {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.dataset.id = book.id;
  bookElement.innerHTML = `
          <h2>${book.title}</h2>
          <p><strong>Author:</strong> ${book.author}</p>
          <button class="remove">Remove</button>
          <button class="read">Toggle Read Status</button>
          <p class="read-status ${
            book.read ? "read-true" : "read-false"
          }">Book is read: ${book.read}</p>
        `;

  attachEventListeners(bookElement);
  return bookElement;
}

function displayBooks() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookElement = createBookElement(book);
    container.appendChild(bookElement);
  });
}

// Initialize library with sample books
myLibrary.push(new Book("The Great Gatsby", "F. Scott Fitzgerald", false));
myLibrary.push(new Book("The Catcher in the Rye", "J. D. Salinger", false));
myLibrary.push(new Book("To Kill a Mockingbird", "Harper Lee", true));
myLibrary.push(new Book("Pride and Prejudice", "Jane Austen", false));

// Display initial books
displayBooks();

// New book form functionality
const newBookButton = document.querySelector(".new-book");
const newBookForm = document.querySelector(".new-book-form");
const cancelButton = document.querySelector(".cancel");

newBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  newBookForm.style.display = "block";
  newBookForm.querySelector("input[name='title']").focus();
});

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = newBookForm.querySelector("input[name='title']").value.trim();
  const author = newBookForm.querySelector("input[name='author']").value.trim();
  const read = newBookForm.querySelector("input[name='read']").checked;

  if (title && author) {
    const newBook = addBookToLibrary(title, author, read);
    const bookElement = createBookElement(newBook);
    container.appendChild(bookElement);

    newBookForm.reset();
    newBookForm.style.display = "none";

    console.log("New book added:", newBook);
  }
});

cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  newBookForm.reset();
  newBookForm.style.display = "none";
});
