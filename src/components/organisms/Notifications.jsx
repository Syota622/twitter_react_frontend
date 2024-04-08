import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../utils/axios";

const NotificationsContainer = styled.div`
  padding: 20px;
  background-color: #f5f8fa;
`;

const NotificationItem = styled.div`
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const NotificationType = styled.p`
  font-weight: bold;
  color: #1da1f2;
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // 通知を取得
    axios
      .get("/notifications")
      .then((response) => {
        setNotifications(response.data.notifications);
      })
      .catch((error) => {
        console.error("通知の取得に失敗しました:", error);
      });
  }, []);

  return (
    <NotificationsContainer>
      <h1>通知</h1>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id}>
          <NotificationType>{notification.type}</NotificationType>
          {notification.type === "follow" ? (
            <p>{notification.notified_by_id}さんにフォローされました</p>
          ) : (
            <p>
              {notification.notified_by_id}さんからの
              {notification.type === "like" ? "いいね" : "コメント"}
              {notification.post_content}
            </p>
          )}
        </NotificationItem>
      ))}
    </NotificationsContainer>
  );
};

export default Notifications;
