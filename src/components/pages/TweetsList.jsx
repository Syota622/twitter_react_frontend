import React, { useEffect, useState } from "react";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentModal from "../organisms/CommentModal";

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
  // コメントモーダルの表示状態と対象のツイートIDを保持するための状態
  const [modal, setModal] = useState({ isOpen: false, tweetId: null });

  // コメントボタンがクリックされたときのハンドラ
  const handleCommentButtonClick = (event, tweetId) => {
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // デフォルトのイベントをキャンセル
    setModal({ isOpen: true, tweetId });
  };

  // コメントモーダルが閉じられたときのハンドラ
  const handleModalClose = () => {
    setModal({ isOpen: false, tweetId: null });
  };

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
          <button
            type="button"
            onClick={(event) => handleCommentButtonClick(event, tweet.id)}
          >
            コメント
          </button>
        </TweetContainer>
      ))}
      {modal.isOpen && (
        <CommentModal
          isOpen={modal.isOpen}
          tweetId={modal.tweetId}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default TweetsList;
