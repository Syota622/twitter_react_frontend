import React, { useEffect, useState } from "react";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import { Link } from "react-router-dom";
import styled from "styled-components";

const TweetContainer = styled(Link)`
  display: block;
  padding: 10px;
  border-bottom: 1px solid #e1e8ed;
  text-decoration: none; // リンクの下線を除去
  color: inherit; // リンクの色を親要素に合わせる
  &:last-child {
    border-bottom: none;
  } // 最後の要素の下線を除去
  &:hover {
    background-color: #f8f8f8;
  } // マウスオーバー時の背景色
`;

const TweetImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain; // 画像の縦横比を保ちつつ、コンテナ内に収める
  margin-top: 10px;
`;

const TweetsList = () => {
  // ツイート一覧を保持するための状態
  const [tweets, setTweets] = useState([]);

  // ツイート一覧を取得する
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get("/tweets");
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
        <TweetContainer to={`/tweets/${tweet.id}`} key={tweet.id}>
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
