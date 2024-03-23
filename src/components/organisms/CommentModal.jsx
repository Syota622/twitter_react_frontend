import React, { useState } from "react";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import Modal from "react-modal";

// モーダルのスタイル
const customStyles = {
  content: {
    position: "absolute",
    top: "50%", // 上端から画面の高さの50%の位置に設定
    left: "50%", // 左端から画面の幅の50%の位置に設定
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)", // 50%上と左にずらして中央に配置
    width: "400px", // モーダルの幅、必要に応じて調整してください
    height: "auto", // モーダルの高さ、内容に応じて自動調整
    overflow: "auto", // 内容がはみ出る場合はスクロール可能に
  },
};

// onCommentPosted propを追加して、コメント投稿成功時の処理を親コンポーネントから受け取れるようにします
const CommentModal = ({ isOpen, tweetId, onClose, onCommentPosted }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("tweet_id", tweetId.toString());
    formData.append("comment", comment);

    try {
      await axios.post("/comment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // コメント投稿が成功したことを親コンポーネントに通知
      if (onCommentPosted) {
        onCommentPosted();
      }
      onClose(); // モーダルを閉じる
    } catch (error) {
      console.error("コメントの作成に失敗しました:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2>コメントを作成</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={comment} onChange={handleCommentChange} />
        <button type="submit">コメントする</button>
      </form>
    </Modal>
  );
};

export default CommentModal;
