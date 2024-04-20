import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TweetForm from "../organisms/TweetForm";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート

const SidebarContainer = styled.div`
  flex: 1;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 50px;
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
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false); // ユーザーが退会したかどうかを表すstate

  // 退会APIを呼び出す関数
  const deleteUser = async () => {
    try {
      const response = await axios.delete(`/users/delete`);
      if (response.status === 200) {
        alert("退会に成功しました");
        // ユーザーをログアウト
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        // ユーザーが退会したことを表すstateを更新
        setIsDeleted(true);
      }
    } catch (error) {
      console.error("退会に失敗しました:", error);
    }
  };

  // ユーザーが退会したときに画面遷移を行う
  useEffect(() => {
    if (isDeleted) {
      navigate("/");
      window.location.reload();
    }
  }, [isDeleted, navigate]);

  return (
    <SidebarContainer>
      <StyledLink to="/">ホーム</StyledLink>
      <StyledLink to="/groups">メッセージ</StyledLink>
      <StyledLink to="/notifications">通知</StyledLink>
      <StyledLink>設定</StyledLink>
      <StyledLink>ログアウト</StyledLink>
      {userId && <StyledLink to={`/user/${userId}`}>プロフィール</StyledLink>}
      <StyledLink onClick={() => deleteUser(userId)}>退会</StyledLink>
      <TweetForm />
    </SidebarContainer>
  );
};

export default Sidebar;
