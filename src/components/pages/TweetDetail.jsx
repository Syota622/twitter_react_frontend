import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const TweetImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain; // 画像の縦横比を保ちつつ、コンテナ内に収める
  margin-top: 10px;
`;

const TweetDetail = () => {
  const { tweetId } = useParams(); // URLパラメータからツイートIDを取得
  const [tweet, setTweet] = useState(null);

  useEffect(() => {
    const fetchTweetDetail = async () => {
      const response = await axios.get(`/tweets/${tweetId}`);
      setTweet(response.data.tweet);
    };
    fetchTweetDetail();
  }, [tweetId]);

  if (!tweet) return <div>Loading...</div>;

  return (
    <div>
      <h2>ツイート詳細</h2>
      <p>{tweet.message}</p>
      {tweet.image_url.Valid && (
        <TweetImage src={tweet.image_url.String} alt="Tweet" />
      )}
    </div>
  );
};

export default TweetDetail;
