import React, { useState, useEffect } from "react";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import { useNavigate } from "react-router-dom";
import SidebarStyledLink from "../atoms/SidebarStyledLink";

const WithDrawal = () => {
  const navigate = useNavigate(); // ルーティングを行うための関数
  const [isDeleted, setIsDeleted] = useState(false); // ユーザーが退会したかどうかを表すstate

  // 退会APIを呼び出す関数
  const deleteUser = async () => {
    try {
      const response = await axios.delete(`/users/delete`);
      if (response.status === 200) {
        alert("退会に成功しました");
        // ユーザーをログアウト
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        // ユーザーが退会したことを表すstateを更新
        setIsDeleted(true);
      }
    } catch (error) {
      console.error("退会に失敗しました:", error);
    }
  };

  // ユーザーが退会したときに、ホーム画面に遷移する
  useEffect(() => {
    if (isDeleted) {
      navigate("/"); // ホーム画面に遷移
      window.location.reload(); // ページをリロード
    }
  }, [isDeleted, navigate]);

  return <SidebarStyledLink onClick={deleteUser}>退会</SidebarStyledLink>;
};

export default WithDrawal;
