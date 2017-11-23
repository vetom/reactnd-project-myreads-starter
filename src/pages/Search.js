import React, { Component } from "react";
import Book from "../components/Book";
import { Link } from "react-router-dom";

export default class extends Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.props.search(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchResult.map(book => (
              <li key={book.id}>
                <Book
                  id={book.id}
                  onMoveToBookshelf={this.props.onMoveToBookshelf}
                  thumbnail={
                    book.imageLinks ? book.imageLinks["thumbnail"] : ""
                  }
                  title={book.title}
                  authors={book.authors ? book.authors.join(", ") : "Unknown"}
                  shelf={
                    this.props.bookshelfHash[book.id]
                      ? this.props.bookshelfHash[book.id]
                      : "none"
                  }
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
