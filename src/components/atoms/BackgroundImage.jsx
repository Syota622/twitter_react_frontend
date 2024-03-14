// atoms/BackgroundImage.jsx
import React from "react";
import styled from "styled-components";

const StyledBackgroundImage = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 15px 15px 0 0;
  z-index: 1; // z-indexを設定して背景を後ろに
`;

const BackgroundImage = ({ imageUrl }) => {
  return (
    <StyledBackgroundImage style={{ backgroundImage: `url(${imageUrl})` }} />
  );
};

export default BackgroundImage;
