// src/components/pages/UserTweetsList.jsx
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
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

const UserTweetsList = ({ userId }) => {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}/tweets`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // トークンをヘッダーに含める
            },
          }
        );
        // レスポンスが有効であれば、tweetsを設定
        if (response.data && response.data.tweets) {
          setTweets(response.data.tweets);
        } else {
          // 有効なデータがない場合は空の配列を設定
          setTweets([]);
        }
      } catch (error) {
        console.error("ツイートの取得に失敗しました:", error);
        setTweets([]); // エラーが発生した場合は空の配列を設定
      }
    };

    fetchTweets();
  }, [userId]); // userIdが変更された時にのみ実行

  if (!tweets) {
    // tweetsがnullまたは未定義の場合はローディング表示など
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetContainer key={tweet.id}>
          <p>{tweet.message}</p>
          {/* tweet.image_url.Valid が true の場合のみ画像を表示 */}
          {tweet.image_url.Valid && (
            <TweetImage src={tweet.image_url.String} alt="Tweet" />
          )}
        </TweetContainer>
      ))}
    </div>
  );
};

export default UserTweetsList;
