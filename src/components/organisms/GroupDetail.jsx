import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import styled from "styled-components";

const GroupDetailContainer = styled.div`
  padding: 20px;
  background-color: #f5f8fa;
`;

const MessageItem = styled.div`
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const GroupDetail = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState({ name: "", messages: [] });
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchGroupMessages = async () => {
      const response = await axios.get(`/group-messages/${groupId}`);
      setGroup({ name: "Group Name", messages: response.data });
    };

    fetchGroupMessages();
  }, [groupId]);

  const handlePostMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    const userId = localStorage.getItem("id"); // ログインユーザーのIDをlocalStorageから取得

    const response = await axios.post("/group-message", {
      group_id: String(groupId), // group_idをstring型に変換
      user_id: userId, // ログインユーザーのIDを使用
      message: newMessage,
    });

    setGroup((prevGroup) => ({
      ...prevGroup,
      messages: [...prevGroup.messages, response.data],
    }));

    setNewMessage("");
  };

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <GroupDetailContainer>
      <h2>{group.name}</h2>
      {group.messages &&
        group.messages.map((msg) => (
          <MessageItem key={msg.id}>
            <p>{msg.message}</p>
          </MessageItem>
        ))}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handlePostMessage}>投稿</button>
    </GroupDetailContainer>
  );
};

export default GroupDetail;
