import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios"; // カスタムインスタンスをインポート
import styled from "styled-components";

const GroupListContainer = styled.div`
  padding: 20px;
  background-color: #f5f8fa;
`;

const GroupItem = styled.div`
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
`;

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get("/groups");
      setGroups(response.data);
    };

    fetchGroups();
  }, []);

  return (
    <GroupListContainer>
      <h1>グループ一覧</h1>
      {groups.map((group) => (
        <GroupItem key={group.id}>
          <StyledLink to={`/group/${group.id}`}>{group.name}</StyledLink>
        </GroupItem>
      ))}
    </GroupListContainer>
  );
};

export default GroupList;
