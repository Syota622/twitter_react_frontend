import React, { useState } from "react";
import axios from "axios";
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
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");

  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // LocalStorageから認証トークンを取得
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://localhost:8080/user/profile",
        {
          username: username,
          email: email,
          bio: bio,
          profile_image_url: profileImageUrl,
          background_image_url: backgroundImageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // プロフィール更新成功
        alert("プロフィールが更新されました");
      } else {
        // プロフィール更新失敗
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>メールアドレス</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>自己紹介</label>
            <Input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <label>プロフィール画像URL</label>
            <Input
              type="text"
              value={profileImageUrl}
              onChange={(e) => setProfileImageUrl(e.target.value)}
            />

            <label>背景画像URL</label>
            <Input
              type="text"
              value={backgroundImageUrl}
              onChange={(e) => setBackgroundImageUrl(e.target.value)}
            />

            <Button type="submit">更新</Button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default UpdateUserProfileModal;
