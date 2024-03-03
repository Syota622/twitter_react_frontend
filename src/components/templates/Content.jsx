import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import TweetsList from "../pages/TweetsList";
import TweetDetail from "../pages/TweetDetail";

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
        <Route path="/tweets/:tweetId" element={<TweetDetail />} />
        <Route path="/" element={<TweetsList />} />
      </Routes>
    </ContentContainer>
  );
};

export default Content;
