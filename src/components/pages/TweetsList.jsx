import React from "react";
import styled from "styled-components";

// 仮のツイートデータ
const dummyTweets = [
  { id: 1, user: "user1", message: "これは最初のツイートです" },
  { id: 2, user: "user2", message: "これは別のツイートです" },
  { id: 3, user: "user3", message: "ツイートは面白いですね！" },
];

const TweetContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e1e8ed;
  &:last-child {
    border-bottom: none;
  }
`;

const TweetsList = () => {
  return (
    <div>
      <h2>ツイート一覧</h2>
      {dummyTweets.map((tweet) => (
        <TweetContainer key={tweet.id}>
          <strong>{tweet.user}</strong>
          <p>{tweet.message}</p>
        </TweetContainer>
      ))}
    </div>
  );
};

export default TweetsList;
