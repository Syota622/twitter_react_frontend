import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import styled from "styled-components";
import Comment from "../organisms/Comment";

const TweetImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain; // 画像の縦横比を保ちつつ、コンテナ内に収める
  margin-top: 10px;
`;

const TweetContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
`;

const TweetDetail = () => {
  const { tweetId } = useParams(); // URLパラメータからツイートIDを取得
  const [tweet, setTweet] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchTweetDetail = async () => {
      // ツイート詳細を取得
      const response = await axios.get(`/tweets/${tweetId}`);
      setTweet(response.data.tweet);
      // ツイートに紐づくコメントを取得
      const commentsResponse = await axios.get(`/comments/${tweetId}`);
      setComments(commentsResponse.data.comments);
    };
    fetchTweetDetail();
  }, [tweetId]);

  if (!tweet) return <div>Loading...</div>;

  return (
    <div>
      <h2>ツイート詳細</h2>
      <TweetContainer>
        <p>{tweet.message}</p>
        {tweet.image_url.Valid && (
          <TweetImage src={tweet.image_url.String} alt="Tweet" />
        )}
      </TweetContainer>
      <h3>コメント</h3>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default TweetDetail;
