import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const TweetContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e1e8ed;
  &:last-child {
    border-bottom: none;
  }
`;

const TweetImage = styled.img`
  max-width: 100%; // 画像の幅がコンテナを超えないようにする
  height: auto; // 画像の高さを自動調整
  margin-top: 10px; // 画像の上の余白
`;

const TweetsList = () => {
  // ツイート一覧を保持するための状態
  const [tweets, setTweets] = useState([]);

  // ツイート一覧を取得する
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
  }, []); // コンポーネントのマウント時にのみ実行

  return (
    <div>
      <h2>ツイート一覧</h2>
      {tweets.map((tweet) => (
        <TweetContainer key={tweet.id}>
          <strong>{tweet.user}</strong>
          <p>{tweet.message}</p>
          {tweet.image_url.Valid && (
            <TweetImage src={tweet.image_url.String} alt="Tweet" />
          )}
        </TweetContainer>
      ))}
    </div>
  );
};

export default TweetsList;
