import React from "react";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./components/Bookshelf";
import Book from "./components/Book";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchResult: [],
    bookshelfHash: {}
  };

  moveToBookshelf = (id, bookshelf) => {
    var books = this.state.books.map(book => {
      if (book.id === id) book.shelf = bookshelf;
      return book;
    });

    var bookshelfHash = this.state.bookshelfHash;
    bookshelfHash[id] = bookshelf;

    BooksAPI.update({ id: id }, bookshelf).then(res => {
      if (bookshelf === "none" || res[bookshelf].includes(id))
        this.setState({ books, bookshelf });
    });
  };

  search = query => {
    if (query) {
      BooksAPI.search(query, 20).then(searchResult => {
        if (Array.isArray(searchResult)) {
          this.setState({ searchResult });
        }
      });
    }
  };

  componentDidMount() {
    var bookshelfHash = {};
    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        bookshelfHash[book.id] = book.shelf;
      });
      this.setState({ books, bookshelfHash });
    });
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={e => this.search(e.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchResult.map(book => (
                  <li key={book.id}>
                    <Book
                      id={book.id}
                      onMoveToBookshelf={this.moveToBookshelf}
                      thumbnail={
                        book.imageLinks ? book.imageLinks["thumbnail"] : ""
                      }
                      title={book.title}
                      authors={
                        book.authors ? book.authors.join(", ") : "Unknown"
                      }
                      shelf={this.state.bookshelfHash[book.id]}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  onMoveToBookshelf={this.moveToBookshelf}
                  title="Currently Reading"
                  books={this.state.books.filter(
                    book => book.shelf === "currentlyReading"
                  )}
                />
                <Bookshelf
                  onMoveToBookshelf={this.moveToBookshelf}
                  title="Want to Read"
                  books={this.state.books.filter(
                    book => book.shelf === "wantToRead"
                  )}
                />
                <Bookshelf
                  onMoveToBookshelf={this.moveToBookshelf}
                  title="Read"
                  books={this.state.books.filter(book => book.shelf === "read")}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
