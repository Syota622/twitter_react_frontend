// atoms/Bio.jsx
import React from "react";
import styled from "styled-components";

const StyledBio = styled.p`
  color: #657786;
  text-align: left;
  padding: 0 20px;
  width: 100%;
`;

const Bio = ({ text }) => {
  return <StyledBio>{text}</StyledBio>;
};

export default Bio;
