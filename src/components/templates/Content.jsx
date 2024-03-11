import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import TweetsList from "../pages/TweetsList";
import TweetDetail from "../pages/TweetDetail";
import UserProfile from "../pages/UserProfile";

const ContentContainer = styled.div`
  flex: 2;
  padding-left: 20px;
  margin-left: 20px;
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
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
    </ContentContainer>
  );
};

export default Content;
