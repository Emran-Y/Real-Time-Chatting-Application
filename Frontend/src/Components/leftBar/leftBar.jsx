import React, { useEffect } from "react";
import { useChatContext } from "../../Context/chatContext";
import { IoMdAdd } from "react-icons/io";
import "./leftBar.css";
import MyChatCard from "../../MyChatCard/MyChatCard";
import senderNameExtractor from "../../methods/senderNameExtractor";

function LeftBar() {
  const { chats, user, setClickedUser, clickedUser } = useChatContext();
  // chats.forEach((chat) => {
  //   console.log(senderNameExtractor(user._id, chat.users));
  // });

  const handleChatClicked = (chatId) => {
    setClickedUser(chatId);
  };

  let chatCards = chats.map((chat) => (
    <MyChatCard
      key={chat._id}
      myId={chat._id}
      senderName={senderNameExtractor(user._id, chat.users)}
      handleFunction={() => handleChatClicked(chat._id)}
    />
  ));
  useEffect(() => {
    chatCards = chats.map((chat) => (
      <MyChatCard
        key={chat._id}
        myId={chat._id}
        senderName={senderNameExtractor(user._id, chat.users)}
        handleFunction={() => handleChatClicked(chat._id)}
      />
    ));
  }, [clickedUser]);

  return (
    <div className="left-bar">
      <div className="leftBar-header">
        <h2 className="leftBar-title">My Chats</h2>
        <div className="create-group">
          <h5 className="new-group-title">New Group Chat</h5>
          <IoMdAdd className="leftBar-add" />
        </div>
      </div>
      <div className="left-main">{chatCards}</div>
    </div>
  );
}

export default LeftBar;
