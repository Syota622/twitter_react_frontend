import React from "react";
import styled from "styled-components";
import TweetForm from "../organisms/TweetForm";

// SidebarはContentの1/2倍の幅を取る
const SidebarContainer = styled.div`
  flex: 1;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #0d8ed9;
  }
`;

const Sidebar = () => {
  return (
    // サイドバー（左側）
    <SidebarContainer>
      <Button>ホーム</Button>
      <Button>プロフィール</Button>
      <Button>メッセージ</Button>
      <Button>設定</Button>
      <Button>ログアウト</Button>
      <TweetForm />
    </SidebarContainer>
  );
};

export default Sidebar;
