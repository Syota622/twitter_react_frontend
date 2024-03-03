// App.jsx
import React, { useState } from "react";
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
  padding: 20px;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
