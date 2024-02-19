import React from "react";
import styled from "styled-components";
import TweetsList from "../pages/TweetsList";

// ContentはSidebarの2倍の幅を取る
const ContentContainer = styled.div`
  flex: 2;
  padding-left: 20px;
  margin-left: 20px;
  border-left: 1px solid #e0e0e0;
`;

const Content = () => {
  return (
    // コンテンツ（右側）
    <ContentContainer>
      <TweetsList />
    </ContentContainer>
  );
};

export default Content;
