// App.jsx
import React, { useState } from "react";
import SignupForm from "./components/molecules/SignupForm";
import LoginForm from "./components/molecules/LoginForm";
import TweetsList from "./components/pages/TweetsList";
import styled from "styled-components";

const AuthContainer = styled.div`
  display: flex;
  justify-content: center; // 中央寄せ
  align-items: center; // 項目を縦方向の中央に配置
  gap: 50px; // 項目間の隙間をなくす
  padding: 50px; // コンテナの内側の余白
`;

function App() {
  // ログイン状態を管理するためのstate
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ログイン成功時の処理
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <h1>Welcome to Twitter Clone</h1>
      {/* ログイン前とログイン後 */}
      {!isLoggedIn ? (
        <AuthContainer>
          <SignupForm />
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </AuthContainer>
      ) : (
        <TweetsList />
      )}
    </>
  );
}

export default App;
