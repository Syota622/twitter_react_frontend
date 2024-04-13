import React from "react";
import styled from "styled-components";
import InputField from "../atoms/InputField";
import SubmitButton from "../atoms/SubmitButton";

const StyledInputField = styled(InputField)`
  margin-right: 10px; // 下側に10pxのマージンを追加
`;

const MessageForm = ({ newMessage, setNewMessage, handlePostMessage }) => (
  <>
    <StyledInputField
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="メッセージ"
    />
    <SubmitButton onClick={handlePostMessage}>投稿</SubmitButton>
  </>
);

export default MessageForm;
