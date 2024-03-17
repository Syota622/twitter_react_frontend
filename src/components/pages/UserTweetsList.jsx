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
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

const UserTweetsList = ({ userId }) => {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(`/users/${userId}/tweets`);
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
        <TweetContainer to={`/tweets/${tweet.id}`} key={tweet.id}>
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
