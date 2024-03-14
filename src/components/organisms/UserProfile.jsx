import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UserTweetsList from "../pages/UserTweetsList";
import UpdateUserProfileModal from "./UpdateUserProfileModal";
import BackgroundImage from "../atoms/BackgroundImage";

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

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute; // 位置を絶対位置に設定
  top: 150px;
  left: 20px;
  z-index: 2; // 他の要素より前面に表示
  border: 4px solid white;
`;

const UserInfoSection = styled.div`
  display: flex;
  width: 100%;
  margin-top: 70px;
`;

const Username = styled.h2`
  font-size: 24px;
  color: #14171a;
`;

const Bio = styled.p`
  color: #657786;
  text-align: left;
  padding: 0 20px;
  width: 100%;
`;

const TabBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  border-bottom: 1px solid #e1e8ed;
`;

const TabButton = styled.button`
  padding: 20px 0;
  border: none;
  background: none;
  font-weight: bold;
  color: #1da1f2;
  border-bottom: 3px solid
    ${(props) => (props.active ? "#1da1f2" : "transparent")}; // アクティブなタブの下線を表示
  &:hover {
    background-color: #e8f5fe;
  }
  flex-grow: 1;
  text-align: center;
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
      // LocalStorageから認証トークンを取得
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        <ProfileImage
          src={userProfile.profile_image_url.String}
          alt="プロフィール画像"
        />
        <div>
          <Username>{userProfile.username}</Username>
          <Bio>{userProfile.bio.String}</Bio>
        </div>
        <UpdateButtonContainer>
          <UpdateUserProfileModal />
        </UpdateButtonContainer>
      </UserInfoSection>
      <TabBar>
        <TabButton onClick={() => setTab("posts")} active={tab === "posts"}>
          ポスト
        </TabButton>
        <TabButton onClick={() => setTab("replies")} active={tab === "replies"}>
          返信
        </TabButton>
        <TabButton onClick={() => setTab("likes")} active={tab === "likes"}>
          いいね
        </TabButton>
      </TabBar>

      {tab === "posts" && <UserTweetsList userId={userId} />}
      {tab === "replies" && <div>返信のダミー内容</div>}
      {tab === "likes" && <div>いいねのダミー内容</div>}
    </ProfileContainer>
  );
};

export default UserProfile;
