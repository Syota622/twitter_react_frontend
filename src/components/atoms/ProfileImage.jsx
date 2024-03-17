// atoms/ProfileImage.jsx
import React from "react";
import styled from "styled-components";

const StyledProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: absolute;
  top: 150px;
  border: 5px solid #fff;
  z-index: 2; // z-indexを設定して前面に
`;

const ProfileImage = ({ imageUrl }) => {
  return <StyledProfileImage src={imageUrl} alt="Profile" />;
};

export default ProfileImage;
