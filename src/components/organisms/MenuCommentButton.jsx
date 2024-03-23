// MenuCommentButton.jsx
import React, { useState } from "react";
import styled from "styled-components";
import MenuCommentModal from "./MenuCommentModal"; // コンポーネント名を確認してください

const MenuButtonContainer = styled.button`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const MenuCommentButton = ({ commentId, onDeleteComment }) => {
  // コンポーネント名を修正
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (event) => {
    event.stopPropagation(); // クリックイベントが親要素に伝播しないようにする
    event.preventDefault(); // デフォルトのイベントをキャンセル
    setModalOpen(true);
  };

  // モーダルを閉じる関数
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <MenuButtonContainer onClick={handleOpenModal}>
        メニュー
      </MenuButtonContainer>
      <MenuCommentModal // コンポーネント名を確認してください
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        commentId={commentId}
        onDeleteComment={onDeleteComment} // onDeleteTweetからonDeleteCommentに修正
      />
    </>
  );
};

export default MenuCommentButton;
