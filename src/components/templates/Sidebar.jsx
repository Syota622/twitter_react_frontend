import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TweetForm from "../organisms/TweetForm";

const SidebarContainer = styled.div`
  flex: 1;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 10px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #0d8ed9;
  }
`;

// ユーザーIDをlocalStorageから取得する関数
const useUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setUserId(id);
    }
  }, []);

  return userId;
};

const Sidebar = () => {
  const userId = useUserId(); // ログインユーザーのIDを取得

  return (
    <SidebarContainer>
      <StyledLink to="/">ホーム</StyledLink>
      <StyledLink>メッセージ</StyledLink>
      <StyledLink>設定</StyledLink>
      <StyledLink>ログアウト</StyledLink>
      {userId && <StyledLink to={`/users/${userId}`}>プロフィール</StyledLink>}
      <TweetForm />
    </SidebarContainer>
  );
};

export default Sidebar;
