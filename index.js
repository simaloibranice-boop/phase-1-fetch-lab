// Function to fetch books from the Game of Thrones API
function fetchBooks() {
  return fetch("https://anapioficeandfire.com/api/books")
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
      renderBooks(data); // Display all books

      // Display the 5th book
      const fifthBookDiv = document.getElementById("fifth-book");
      fifthBookDiv.textContent = "5th Book: " + data[4].name;

      // Display total pages
      const totalPages = data.reduce((sum, book) => sum + book.numberOfPages, 0);
      const totalPagesDiv = document.getElementById("total-pages");
      totalPagesDiv.textContent = "Total Pages: " + totalPages;

      // Fetch and display the 1031st character
      return fetch("https://anapioficeandfire.com/api/characters/1031")
        .then(resp => resp.json())
        .then(character => {
          const charDiv = document.getElementById("character-1031");
          charDiv.textContent = "1031st Character: " + (character.name || "No name found");
        });
    });
}

// Function to render book titles on the page
function renderBooks(books) {
  const list = document.getElementById("book-list");
  list.innerHTML = ""; // Clear any existing content

  books.forEach(book => {
    const li = document.createElement("li");
    li.textContent = book.name; // Display the book name
    list.appendChild(li);
  });
}

// Run fetchBooks when the page loads
document.addEventListener("DOMContentLoaded", fetchBooks);
