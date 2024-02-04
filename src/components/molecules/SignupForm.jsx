// src/components/organisms/SignupForm.js
import React, { useState } from "react";
import InputField from "../atoms/InputField"; // 修正されたインポート
import Button from "../atoms/Button";
import styled from "styled-components";
import axios from "axios";

const Form = styled.form`
  max-width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Label = styled.label`
  margin-top: 10px;
`;

// SignupFormコンポーネントを作成
const SignupForm = () => {
  // フォームの入力値を管理するためのstateを作成
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  // フォームの入力値が変更されたときに呼び出される関数
  const handleChange = (e) => {
    const { name, value } = e.target; // e.targetからnameとvalueを抽出(<input type="email" name="email" placeholder="メールアドレス" class="sc-beySPh dmCSEs" value="moko1@gmail.com">)
    setFormData({ ...formData, [name]: value }); // 抽出したnameとvalueを使用
  };

  // フォームが送信されたときに呼び出される関数
  const handleSubmit = async (e) => {
    e.preventDefault(); // フォームのデフォルトの送信処理をキャンセル
    try {
      await axios.post("http://localhost:8080/signup", formData); // サインアップリクエストを送信
      alert("Signup successful!"); // サインアップ成功時のアラート
    } catch (error) {
      console.error("サインアップエラー:", error.response.data);
      alert("Signup failed!"); // サインアップ失敗時のアラート
    }
  };

  // フォームを作成
  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="username">Username</Label>
      <InputField
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="ユーザー名"
      />

      <Label htmlFor="password">Password</Label>
      <InputField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="パースワード"
      />

      <Label htmlFor="email">Email</Label>
      <InputField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="メールアドレス"
      />

      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignupForm;
