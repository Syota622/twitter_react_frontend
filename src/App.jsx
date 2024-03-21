// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SignupForm from "./components/organisms/SignupForm";
import LoginForm from "./components/organisms/LoginForm";
import Sidebar from "./components/templates/Sidebar";
import Content from "./components/templates/Content";
import styled from "styled-components";

// 新しいスタイル付きコンポーネント
const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 50px;
`;

// ログイン後のメインレイアウトスタイル
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  max-width: 1200px; // 最大幅はコンテンツに合わせて調整
  margin: auto; // 自動で中央寄せ
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // localStorageからログイン状態を確認
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <AuthContainer>
          <SignupForm />
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </AuthContainer>
      ) : (
        <MainContainer>
          <Sidebar />
          <Content />
        </MainContainer>
      )}
    </Router>
  );
}

export default App;
