import React from "react";
import styled from "styled-components";

const CommentContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
`;

const Comment = ({ comment }) => {
  return (
    <CommentContainer>
      <p>{comment.comment}</p>
    </CommentContainer>
  );
};

export default Comment;
