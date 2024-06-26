// src/components/organisms/TweetForm.jsx
import React, { useState } from "react";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
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

    // 画像アップロードとツイートの投稿を処理するAPIエンドポイントにリクエストを送信
    try {
      await axios.post("/tweets", formData);
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
