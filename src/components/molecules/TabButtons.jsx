// molecules/TabButtons.jsx
import React from "react";
import TabButton from "../atoms/TabButton";

const TabButtons = ({ currentTab, setTab }) => {
  return (
    <>
      <TabButton
        onClick={() => setTab("posts")}
        active={currentTab === "posts"}
      >
        ポスト
      </TabButton>
      <TabButton
        onClick={() => setTab("comment")}
        active={currentTab === "comment"}
      >
        コメント
      </TabButton>
      <TabButton
        onClick={() => setTab("likes")}
        active={currentTab === "likes"}
      >
        いいね
      </TabButton>
    </>
  );
};

export default TabButtons;
