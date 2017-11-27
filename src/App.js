import React from "react";
import * as BooksAPI from "./BooksAPI";
import Search from "./pages/Search";
import Home from "./pages/Home";
import { Route } from "react-router-dom";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResult: [],
    bookshelfHash: {}
  };

  moveToBookshelf = (id, bookshelf) => {
    let books = this.state.books.map(book => {
      if (book.id === id) book.shelf = bookshelf;
      return book;
    });

    let bookshelfHash = this.state.bookshelfHash;
    bookshelfHash[id] = bookshelf;

    BooksAPI.update({ id: id }, bookshelf).then(res => {
      if (bookshelf === "none" || res[bookshelf].includes(id)) {
        this.setState({ books, bookshelf });
      }
    });
  };

  search = query => {
    if (query) {
      BooksAPI.search(query, 20).then(
        searchResult => {
          if (!Array.isArray(searchResult)) searchResult = [];
          this.setState({ searchResult });
        },
        () => {
          let searchResult = [];
          this.setState({ searchResult });
        }
      );
    } else {
      let searchResult = [];
      this.setState({ searchResult });
    }
  };

  loadBooks = () => {
    let bookshelfHash = {};
    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        bookshelfHash[book.id] = book.shelf;
      });
      this.setState({ books, bookshelfHash });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search
              searchResult={this.state.searchResult}
              search={this.search}
              bookshelfHash={this.state.bookshelfHash}
              onMoveToBookshelf={this.moveToBookshelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Home
              loadBooks={this.loadBooks}
              books={this.state.books}
              onMoveToBookshelf={this.moveToBookshelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
