import { useEffect, useState } from "react";
import styled from "styled-components";
import TweetForm from "../organisms/TweetForm";
import WithDrawal from "../organisms/WithDrawal";
import SidebarStyledLink from "../atoms/SidebarStyledLink";

const SidebarContainer = styled.div`
  flex: 1;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 50px;
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
      <SidebarStyledLink to="/">ホーム</SidebarStyledLink>
      <SidebarStyledLink to="/groups">メッセージ</SidebarStyledLink>
      <SidebarStyledLink to="/notifications">通知</SidebarStyledLink>
      <SidebarStyledLink>設定</SidebarStyledLink>
      <SidebarStyledLink>ログアウト</SidebarStyledLink>
      {userId && (
        <SidebarStyledLink to={`/user/${userId}`}>
          プロフィール
        </SidebarStyledLink>
      )}
      <WithDrawal userId={userId} />
      <TweetForm />
    </SidebarContainer>
  );
};

export default Sidebar;
