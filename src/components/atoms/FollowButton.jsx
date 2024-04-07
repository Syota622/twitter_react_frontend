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

// isFollowingがtrueの場合は「フォロー中」、falseの場合は「フォロー」を表示
const FollowButton = ({ isFollowing, handleToggleFollow }) => (
  <StyledButton onClick={handleToggleFollow}>
    {isFollowing ? "フォロー中" : "フォロー"}
  </StyledButton>
);

export default FollowButton;
