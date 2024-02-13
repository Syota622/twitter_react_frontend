// src/components/molecules/LoginForm.jsx
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

// LoginFormコンポーネントを作成
const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // フォームの入力値が変更されたときに呼び出される関数
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // フォームが送信されたときに呼び出される関数
  const handleSubmit = async (e) => {
    e.preventDefault(); // フォームのデフォルトの送信処理をキャンセル
    try {
      const response = await axios.post("/login", formData);
      if (response && response.data) {
        // レスポンスとそのdataプロパティの存在を確認
        localStorage.setItem("token", response.data.token); // セキュリティトークンをlocalStorageに保存
        onLoginSuccess(); // ログイン成功時の親コンポーネントのコールバック関数を呼び出す
      } else {
        // レスポンスが正しくない場合のエラーハンドリング
        console.error("レスポンスが無効です。");
      }
    } catch (error) {
      // ネットワークエラーやレスポンスエラーの処理
      console.error(
        "ログインエラー:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="email">Email</Label>
      <InputField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <Label htmlFor="password">Password</Label>
      <InputField
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <Button type="submit">Login</Button> {/* ここでログインボタンを表示 */}
    </Form>
  );
};

export default LoginForm;

// console.log(response.data);
// {
//   "message": "ログインに成功しました",
//   "request_data": {
//       "email": "mokomoko@gmail.com",
//       "password": "Passw0rd"
//   },
//   "token": "088efa14-e9cd-4eaf-9d3d-e753eb99e9b3"
// }
