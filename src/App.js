import React from "react";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./components/Bookshelf";
import Search from "./pages/Search";
import { Link, Route, Switch } from "react-router-dom";
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
      BooksAPI.search(query, 20).then(searchResult => {
        if (Array.isArray(searchResult)) this.setState({ searchResult });
      });
    }
  };

  componentDidMount() {
    let bookshelfHash = {};
    BooksAPI.getAll().then(books => {
      books.forEach(book => {
        bookshelfHash[book.id] = book.shelf;
      });
      this.setState({ books, bookshelfHash });
    });
    console.log("componentDidMount");
  }

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
                    books={this.state.books.filter(
                      book => book.shelf === "read"
                    )}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
