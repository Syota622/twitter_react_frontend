// src/components/organisms/SignupForm.js
import React, { useState } from "react";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import styled from "styled-components";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート

const Form = styled.form`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    const { name, value } = e.target; // e.targetからnameとvalueを抽出
    setFormData({ ...formData, [name]: value }); // 抽出したnameとvalueを使用
  };

  // フォームが送信されたときに呼び出される関数
  const handleSubmit = async (e) => {
    e.preventDefault(); // フォームのデフォルトの送信処理をキャンセル
    try {
      await axios.post("/signup", formData); // サインアップリクエストを送信
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

      <Label htmlFor="email">Email</Label>
      <InputField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="メールアドレス"
      />

      <Label htmlFor="password">Password</Label>
      <InputField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="パスワード"
      />

      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignupForm;
