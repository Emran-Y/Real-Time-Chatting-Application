import React from "react";
import { useChatContext } from "../../Context/chatContext";
import "./leftBar.css";

function LeftBar() {
  const { chats } = useChatContext();
  return <div className="left-bar"></div>;
}

export default LeftBar;
