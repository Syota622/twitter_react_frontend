// atoms/Username.jsx
import React from "react";
import styled from "styled-components";

const StyledUsername = styled.h2`
  font-size: 24px;
  color: #14171a;
`;

const Username = ({ text }) => {
  return <StyledUsername>{text}</StyledUsername>;
};

export default Username;
