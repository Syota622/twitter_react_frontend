import React, { useEffect, useState } from "react";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentModal from "../organisms/CommentModal";
import BookMarkButton from "../atoms/BookMarkButton";

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

const Username = styled(Link)`
  color: blue;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
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

  // リツイートを作成する
  const handleRetweet = async (event, tweetId) => {
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // デフォルトのイベントをキャンセル
    try {
      await axios.post(`/retweet/${tweetId}`);
      // リツイート成功後、ツイート一覧を再取得
      const response = await axios.get("/tweets");
      setTweets(response.data.tweets);
    } catch (error) {
      console.error("リツイートの作成に失敗しました:", error);
    }
  };

  // 「いいね」を作成する
  const handleLike = async (event, tweetId) => {
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // デフォルトのイベントをキャンセル
    try {
      await axios.post(`/like/${tweetId}`);
      // 「いいね」成功後、ツイート一覧を再取得
      const response = await axios.get("/tweets");
      setTweets(response.data.tweets);
    } catch (error) {
      console.error("「いいね」の作成に失敗しました:", error);
    }
  };

  const handleBookmark = async (event, tweetId, isBookmarked) => {
    event.stopPropagation(); // イベントの伝播を停止
    event.preventDefault(); // デフォルトのイベントをキャンセル
    try {
      // ユーザーIDを取得し、数値型に変換
      const userId = Number(localStorage.getItem("id"));
      if (isBookmarked) {
        // ブックマークがすでに存在する場合は削除
        await axios.delete(`/bookmark`, {
          data: { user_id: userId, tweet_id: tweetId },
        });
      } else {
        // ブックマークが存在しない場合は作成
        await axios.post(`/bookmark`, { user_id: userId, tweet_id: tweetId });
      }
      // ブックマークを作成または削除した後にツイート一覧を再取得
      const response = await axios.get(`/tweets`);
      setTweets(response.data.tweets);
    } catch (error) {
      console.error("ブックマークの操作に失敗しました:", error);
    }
  };

  return (
    <div>
      <h2>ツイート一覧</h2>
      {tweets.map((tweet) => (
        <TweetContainer to={`/tweets/${tweet.id}`} key={tweet.id}>
          <Username to={`/user/${tweet.user_id}`}>{tweet.username}</Username>
          <p>{tweet.message}</p>
          {tweet.image_url.Valid && (
            <TweetImage src={tweet.image_url.String} alt="Tweet" />
          )}
          <button
            type="button"
            onClick={(event) => handleCommentButtonClick(event, tweet.id)}
            style={{ marginRight: "10px" }} // 右側に10pxのマージンを追加
          >
            コメント
          </button>
          <button
            type="button"
            onClick={(event) => handleRetweet(event, tweet.id)}
          >
            リツイート
          </button>
          {/* リツイート数を表示 */}
          <span style={{ marginLeft: "10px" }}>{tweet.retweet_count}</span>{" "}
          <button
            type="button"
            onClick={(event) => handleLike(event, tweet.id)}
          >
            いいね
          </button>
          {/* いいね数を表示 */}
          <span style={{ marginLeft: "10px" }}>{tweet.like_count}</span>{" "}
          {/* ブックマークボタン */}
          <BookMarkButton
            onClick={(event) =>
              handleBookmark(event, tweet.id, tweet.is_bookmarked)
            }
            isBookmarked={tweet.is_bookmarked}
          />
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
