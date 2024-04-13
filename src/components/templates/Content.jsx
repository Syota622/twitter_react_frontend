import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import TweetsList from "../pages/TweetsList";
import TweetDetail from "../pages/TweetDetail";
import UserProfile from "../organisms/UserProfile";
import Notifications from "../organisms/Notifications";
import GroupList from "../organisms/GroupList";
import GroupDetail from "../organisms/GroupDetail";

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
        {/* グループ一覧 */}
        <Route path="/groups" element={<GroupList />} />
        {/* グループ詳細 */}
        <Route path="/group/:groupId" element={<GroupDetail />} />
      </Routes>
    </ContentContainer>
  );
};

export default Content;
