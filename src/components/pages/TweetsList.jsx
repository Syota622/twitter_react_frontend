import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート

const TweetContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e1e8ed;
  &:last-child {
    border-bottom: none;
  }
`;

// ツイート一覧を表示するコンポーネント
const TweetsList = () => {
  const [tweets, setTweets] = useState([]);

  // マウント時にツイート一覧を取得
  useEffect(() => {
    const fetchTweets = async () => {
      const token = localStorage.getItem("token"); // ローカルストレージからトークンを取得

      try {
        const response = await axios.get("http://localhost:8080/tweets", {
          headers: {
            Authorization: `Bearer ${token}`, // トークンをヘッダーに含める
          },
        });
        setTweets(response.data.tweets);
      } catch (error) {
        console.error("ツイートの取得に失敗しました:", error);
      }
    };

    fetchTweets();
  }, []); // 空の依存配列を渡して、コンポーネントのマウント時にのみ実行されるようにする

  return (
    <div>
      <h2>ツイート一覧</h2>
      {tweets.map((tweet) => (
        <TweetContainer key={tweet.id}>
          <strong>{tweet.user}</strong>
          <p>{tweet.message}</p>
        </TweetContainer>
      ))}
    </div>
  );
};

export default TweetsList;
