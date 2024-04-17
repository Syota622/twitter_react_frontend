import React from "react";

const SubmitButton = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

export default SubmitButton;
