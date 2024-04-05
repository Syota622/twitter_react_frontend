import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const FollowButton = ({ isFollowing, handleFollow }) => (
  <StyledButton onClick={handleFollow}>
    {isFollowing ? "フォロー中" : "フォロー"}
  </StyledButton>
);

export default FollowButton;
