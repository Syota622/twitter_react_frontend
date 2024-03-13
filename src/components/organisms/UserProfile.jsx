import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UserTweetsList from "../pages/UserTweetsList";
import UpdateUserProfileModal from "./UpdateUserProfileModal";

// スタイル定義
const ProfileContainer = styled.div`
  padding: 20px;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Username = styled.h2`
  margin-bottom: 10px;
`;

const Bio = styled.p`
  margin-bottom: 20px;
`;

const UserProfile = () => {
  // ユーザーIDをURLパラメータから取得
  const { userId } = useParams();
  // ユーザープロフィール情報を取得
  const [userProfile, setUserProfile] = useState(null);

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
      setUserProfile(response.data);
    };

    fetchUserProfile();
  }, [userId]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <BackgroundImage
        src={userProfile.background_image_url.String}
        alt="バックグラウンド画像"
      />
      <ProfileImage
        src={userProfile.profile_image_url.String}
        alt="プロフィール画像"
      />
      <Username>{userProfile.username}</Username>
      <Bio>{userProfile.bio.String}</Bio>
      <UpdateUserProfileModal />
      <UserTweetsList userId={userId} />
    </ProfileContainer>
  );
};

export default UserProfile;
