import React, { useState } from "react";
import { useChatContext } from "../../Context/chatContext";
import "./rightBar.css";
import senderNameExtractor from "../../methods/senderNameExtractor";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
function RightBar() {
  const {
    clickedUser,
    chats,
    user,
    isSelectedUserPopUp,
    setIsSelectedUserPopUp,
  } = useChatContext();
  const [msg, setMsg] = useState();
  const [isHeading, setIsHeading] = useState(true);
  let theChat;

  if (clickedUser) {
    theChat = chats.find((chat) => chat._id === clickedUser);
    // theChat = senderNameExtractor(
    //   user._id,
    //   chats.find((chat) => chat._id === clickedUser).users
    // );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="right-bar">
      {clickedUser.length > 0 ? (
        <div className="component-wrapper">
          <div className="rightBar-header">
            <h3 className="rightBar-name">
              {theChat.isGroupChat
                ? theChat.chatName
                : senderNameExtractor(
                    user._id,
                    chats.find((chat) => chat._id === clickedUser).users
                  ).name}
            </h3>
            {!isSelectedUserPopUp ? (
              <FaEye
                className="view"
                onClick={() => setIsSelectedUserPopUp(true)}
              />
            ) : (
              <FaEyeSlash className="view" />
            )}
          </div>

          <div className="rightBar-below">
            <div className="rightBar-main"></div>
            <form className="rightBar-footer" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                value={msg}
                onChange={(e) => handleChange(e)}
                className="msg-input"
                placeholder="Send a message"
              />
              <button type="submit" className="send-btn">
                send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="start-chat-container">
          <h1 className="start-chat">Click on a User to Start Chatting</h1>
        </div>
      )}
    </div>
  );
}

export default RightBar;
