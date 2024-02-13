// src/components/TweetForm.jsx
import React, { useState } from "react";
import axios from "axios"; // axiosをインポート
import Button from "../atoms/Button";

const TweetForm = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  // 画像が選択されたときに呼び出される関数
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // 選択された最初のファイルをimage状態にセット
  };

  // フォームが送信されたときに呼び出される関数
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData: フォームデータを扱うための組み込みオブジェクト
    const formData = new FormData();
    formData.append("message", message);
    if (image) {
      formData.append("image", image);
    }

    // セッショントークンを取得する部分を追加
    const token = localStorage.getItem("token");

    // 画像アップロードとツイートの投稿を処理するAPIエンドポイントにリクエストを送信
    try {
      await axios.post("http://localhost:8080/tweet", formData, {
        headers: {
          // BearerトークンとしてAuthorizationヘッダーに追加
          Authorization: `Bearer ${token}`,
        },
      });
      alert("ツイートが投稿されました！");
    } catch (error) {
      console.error("ツイートの投稿に失敗しました。", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="何をつぶやこうか..."
      />
      <input type="file" onChange={handleImageChange} />
      <Button type="submit">ツイート</Button>
    </form>
  );
};

export default TweetForm;
