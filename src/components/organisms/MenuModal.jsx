// MenuModal.jsx
import React, { useEffect } from "react";
import styled from "styled-components";

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: -100px;
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 30px;
`;

const MenuModal = ({ isOpen, onClose }) => {
  // メニューが開いている時だけイベントリスナーを登録
  useEffect(() => {
    const closeMenu = (event) => {
      // メニュー内の要素がクリックされた場合は閉じない
      if (event.target.closest(".do-not-close")) return;
      // メニュー以外の場所がクリックされた場合は閉じる
      onClose();
    };

    // メニューが開いている時だけイベントリスナーを登録
    if (isOpen) {
      document.addEventListener("click", closeMenu);
    }

    // コンポーネントがアンマウントされた時にイベントリスナーを解除
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <DeleteButton className="do-not-close" onClick={onClose}>
      削除
    </DeleteButton>
  );
};

export default MenuModal;
