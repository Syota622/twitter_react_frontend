import React, { useState, useEffect } from "react";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UserTweetsList from "../pages/UserTweetsList";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import BackgroundImage from "../atoms/BackgroundImage";
import ProfileImage from "../atoms/ProfileImage";
import Username from "../atoms/Username";
import Bio from "../atoms/Bio";
import TabButtons from "../molecules/TabButtons";
import UserCommentsList from "./UserCommentsList";

// スタイル定義
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  margin: 20px auto; // 自動で中央に配置
  max-width: 600px;
  position: relative; // 子要素の絶対位置を設定する基準点に
`;

const UserInfoSection = styled.div`
  display: flex;
  width: 100%;
  margin-top: 70px;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  border-bottom: 1px solid #e1e8ed;
`;

const UpdateButtonContainer = styled.div`
  position: absolute; // 絶対位置を指定
  top: 230px; // コンテナの上から10pxの位置に設定
  right: 20px; // 右から20pxの位置に設定
`;

const UserProfile = () => {
  // ユーザーIDをURLパラメータから取得
  const { userId } = useParams();
  // ユーザープロフィール情報を取得
  const [userProfile, setUserProfile] = useState(null);
  // タブの状態を管理する状態変数
  const [tab, setTab] = useState("posts");

  // ユーザープロフィール情報を取得
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await axios.get(`/user/${userId}`);
      setUserProfile(response.data); // ユーザープロフィール情報を設定
    };

    fetchUserProfile();
  }, [userId]);

  // ユーザープロフィール情報が取得できるまでローディング表示
  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <BackgroundImage imageUrl={userProfile.background_image_url.String} />
      <UserInfoSection>
        <ProfileImage imageUrl={userProfile.profile_image_url.String} />
        <div>
          <Username text={userProfile.username} />
          <Bio text={userProfile.bio.String} />
        </div>
        <UpdateButtonContainer>
          <UpdateUserProfileModal />
        </UpdateButtonContainer>
      </UserInfoSection>
      <TabBar>
        <TabButtons currentTab={tab} setTab={setTab} />
      </TabBar>

      {tab === "posts" && <UserTweetsList userId={userId} />}
      {tab === "comments" && <UserCommentsList userId={userId} />}
      {tab === "likes" && <div>いいねのダミー内容</div>}
    </ProfileContainer>
  );
};

export default UserProfile;
