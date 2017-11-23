import React from "react";

export default ({ bookId, value, onMoveToBookshelf }) => (
  <div className="book-shelf-changer">
    <select
      value={value}
      onChange={e => onMoveToBookshelf(bookId, e.target.value)}
    >
      <option value="moveTo" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
);
