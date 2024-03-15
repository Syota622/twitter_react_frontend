import React, { useState } from "react";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import styled from "styled-components";

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  z-index: 3;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

function UpdateUserProfileModal() {
  // モーダルの表示状態を管理
  const [show, setShow] = useState(false);
  // ユーザー情報を管理
  const [user, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    profile_image_url: "",
    background_image_url: "",
  });

  // モーダルを表示する関数
  const handleShow = () => setShow(true);

  // ユーザーが入力フィールドの値を変更したときに呼ばれる関数
  const onChangeUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put("/user/profile", user);

      if (response.status === 200) {
        alert("プロフィールが更新されました");
      } else {
        alert("プロフィールの更新に失敗しました");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleShow}>プロフィールを更新</Button>

      {show && (
        <Modal>
          <h2>プロフィールを更新</h2>
          <form onSubmit={handleSubmit}>
            <label>ユーザー名</label>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={onChangeUser}
              placeholder="ユーザー名"
            />

            <label>メールアドレス</label>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={onChangeUser}
              placeholder="メールアドレス"
            />

            <label>自己紹介</label>
            <Input
              type="text"
              name="bio"
              value={user.bio}
              onChange={onChangeUser}
              placeholder="自己紹介"
            />

            <label>プロフィール画像URL</label>
            <Input
              type="text"
              name="profile_image_url"
              value={user.profile_image_url}
              onChange={onChangeUser}
              placeholder="プロフィール画像URL"
            />

            <label>背景画像URL</label>
            <Input
              type="text"
              name="background_image_url"
              value={user.background_image_url}
              onChange={onChangeUser}
              placeholder="背景画像URL"
            />

            <Button type="submit">更新</Button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default UpdateUserProfileModal;
