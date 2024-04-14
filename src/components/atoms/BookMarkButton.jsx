import React from "react";

const BookMarkButton = ({ onClick, isBookmarked }) => {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick(event);
      }}
      style={{ backgroundColor: isBookmarked ? "blue" : "white" }}
    >
      ブックマーク
    </button>
  );
};

export default BookMarkButton;
