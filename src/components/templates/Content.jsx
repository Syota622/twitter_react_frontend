import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import TweetsList from "../pages/TweetsList";
import TweetDetail from "../pages/TweetDetail";
import UserProfile from "../organisms/UserProfile";
import Notifications from "../organisms/Notifications";

const ContentContainer = styled.div`
  flex: 2;
  border-left: 1px solid #e0e0e0;
`;

const Content = () => {
  return (
    <ContentContainer>
      <Routes>
        {/* ツイートリスト */}
        <Route path="/" element={<TweetsList />} />
        {/* ツイート詳細 */}
        <Route path="/tweets/:tweetId" element={<TweetDetail />} />
        {/* プロフィール */}
        <Route path="/user/:userId" element={<UserProfile />} />
        {/* 通知 */}
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </ContentContainer>
  );
};

export default Content;
