import React, { Component } from "react";
import BookShelfChanger from "./BookShelfChanger";

export default class extends Component {
  state = {
    width: 128,
    height: 192,
    backgroundImage: ""
  };

  componentDidMount() {
    if (this.props.thumbnail) {
      let img = new Image();
      img.src = this.props.thumbnail;
      img.onload = () => {
        this.setState({
          width: img.naturalWidth,
          height: img.naturalHeight,
          backgroundImage: img.src
        });
      };
    }
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: this.state.width,
              height: this.state.height,
              backgroundImage: `url(${this.state.backgroundImage})`
            }}
          />
          <BookShelfChanger
            onMoveToBookshelf={this.props.onMoveToBookshelf}
            bookId={this.props.id}
            value={this.props.shelf}
          />
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    );
  }
}
