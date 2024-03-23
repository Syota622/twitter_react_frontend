import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuButton from "../organisms/MenuButton";
import CommentModal from "../organisms/CommentModal";
import Comment from "../organisms/Comment"; // コメントを表示するコンポーネントをインポート

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
  position: relative;
`;

const TweetImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
`;

// ユーザーのツイート一覧とそれに関連するコメントを表示するコンポーネント
const UserCommentsList = ({ userId }) => {
  // ツイート一覧を保持するための状態
  const [tweets, setTweets] = useState(null);
  // コメントモーダルの表示状態と対象のツイートIDを保持するための状態
  const [modal, setModal] = useState({ isOpen: false, tweetId: null });

  useEffect(() => {
    // ツイートとコメントを取得する関数
    const fetchTweetsAndComments = async () => {
      try {
        const response = await axios.get(`/users/${userId}/tweets`);
        // レスポンスが有効であれば、各ツイートにコメントを追加して設定
        if (response.data && response.data.tweets) {
          const tweetsData = await Promise.all(
            response.data.tweets.map(async (tweet) => {
              try {
                // 各ツイートに対してコメントを取得
                const commentsResponse = await axios.get(
                  `/comments/${tweet.id}`
                );
                return {
                  ...tweet,
                  comments: commentsResponse.data.comments || [],
                };
              } catch (error) {
                console.error("コメントの取得に失敗しました:", error);
                return { ...tweet, comments: [] };
              }
            })
          );
          setTweets(tweetsData);
        } else {
          // 有効なデータがない場合は空の配列を設定
          setTweets([]);
        }
      } catch (error) {
        console.error("ツイートの取得に失敗しました:", error);
        setTweets([]); // エラーが発生した場合は空の配列を設定
      }
    };

    fetchTweetsAndComments();
  }, [userId]);

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

  if (!tweets) {
    // tweetsがnullまたは未定義の場合はローディング表示など
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      {/* ツイート一覧を表示 */}
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <TweetContainer to={`/tweets/${tweet.id}`}>
            <p>{tweet.message}</p>
            {tweet.image_url.Valid && (
              <TweetImage src={tweet.image_url.String} alt="Tweet" />
            )}
            <MenuButton tweetId={tweet.id} onDeleteTweet={() => {}} />
            <button
              type="button"
              onClick={(event) => handleCommentButtonClick(event, tweet.id)}
            >
              コメント
            </button>
          </TweetContainer>
          {/* 各ツイートのコメントを表示 */}
          {tweet.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
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

export default UserCommentsList;
