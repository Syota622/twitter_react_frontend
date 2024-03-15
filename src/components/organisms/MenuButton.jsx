// MenuButton.jsx
import React, { useState } from "react";
import styled from "styled-components";
import MenuModal from "./MenuModal";

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

const MenuButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // モーダルを表示する関数
  const handleOpenModal = (event) => {
    event.stopPropagation();
    event.preventDefault();
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
      <MenuModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default MenuButton;
