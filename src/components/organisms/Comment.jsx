import React from "react";
import styled from "styled-components";
import MenuCommentButton from "./MenuCommentButton";

const CommentContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  position: relative;
`;

const Comment = ({ comment, onDeleteComment }) => {
  return (
    <CommentContainer>
      <p>{comment.comment}</p>
      <MenuCommentButton
        commentId={comment.id}
        onDeleteComment={onDeleteComment}
      />
    </CommentContainer>
  );
};

export default Comment;
