import React from "react";
import Book from "./Book";

export default ({ title, books, onMoveToBookshelf }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book
              id={book.id}
              onMoveToBookshelf={onMoveToBookshelf}
              thumbnail={book.imageLinks ? book.imageLinks["thumbnail"] : ""}
              title={book.title}
              authors={book.authors ? book.authors.join(", ") : "Unknown"}
              shelf={book.shelf}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
);
