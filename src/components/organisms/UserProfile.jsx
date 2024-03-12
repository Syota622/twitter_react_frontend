import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UserTweetsList from "../pages/UserTweetsList";

// スタイル定義
const ProfileContainer = styled.div`
  padding: 20px;
`;

const Username = styled.h2`
  margin-bottom: 10px;
`;

const Bio = styled.p`
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const UserProfile = () => {
  const { userId } = useParams();
  // ダミーデータ、実際にはAPIから取得したデータを使用
  const userProfile = {
    username: "ユーザー名",
    bio: "ここに自己紹介文が入ります。",
    profileImageUrl: "プロフィール画像のURL",
  };

  return (
    <ProfileContainer>
      <ProfileImage src={userProfile.profileImageUrl} alt="プロフィール画像" />
      <Username>{userProfile.username}</Username>
      <Bio>{userProfile.bio}</Bio>
      <UserTweetsList userId={userId} />
    </ProfileContainer>
  );
};

export default UserProfile;
