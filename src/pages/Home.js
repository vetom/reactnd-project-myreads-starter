import React, { Component } from "react";
import Bookshelf from "../components/Bookshelf";
import { Link } from "react-router-dom";

export default class extends Component {
  componentDidMount() {
    this.props.loadBooks();
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              onMoveToBookshelf={this.props.onMoveToBookshelf}
              title="Currently Reading"
              books={this.props.books.filter(
                book => book.shelf === "currentlyReading"
              )}
            />
            <Bookshelf
              onMoveToBookshelf={this.props.onMoveToBookshelf}
              title="Want to Read"
              books={this.props.books.filter(
                book => book.shelf === "wantToRead"
              )}
            />
            <Bookshelf
              onMoveToBookshelf={this.props.onMoveToBookshelf}
              title="Read"
              books={this.props.books.filter(book => book.shelf === "read")}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
