import React, { useEffect, useState } from "react";
import { useChatContext } from "../../Context/chatContext";
import "./rightBar.css";
import senderNameExtractor from "../../methods/senderNameExtractor";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import LeftText from "../LeftText/LeftText";
import RightText from "../leftBar/RightText/RightText";
import { format } from "timeago.js";
function RightBar() {
  const {
    clickedUser,
    chats,
    user,
    isSelectedUserPopUp,
    setIsSelectedUserPopUp,
  } = useChatContext();
  const [msg, setMsg] = useState("");
  const [isHeading, setIsHeading] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  let theChat;

  let newMessage;

  if (clickedUser && user && msg.length > 0) {
    newMessage = {
      chatId: clickedUser,
      senderId: user._id,
      content: msg,
    };
  }

  if (clickedUser) {
    theChat = chats.find((chat) => chat._id === clickedUser);
    // theChat = senderNameExtractor(
    //   user._id,
    //   chats.find((chat) => chat._id === clickedUser).users
    // );
  }

  if (allMessages.length > 0) {
    console.log(allMessages);
  }
  let messages = [];
  if (allMessages.length > 0) {
    console.log(allMessages);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user && user.token}`,
      },
      body: JSON.stringify(newMessage && newMessage),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setAllMessages((allMessages) => {
          return [...allMessages, data];
        });
        setMsg("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      await fetchAllMessages();
    };

    fetchMessages();
  }, [clickedUser]);

  const fetchAllMessages = async () => {
    try {
      if (clickedUser.length > 0) {
        const response = await fetch(
          `http://localhost:5000/api/message/${clickedUser}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user && user.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllMessages(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
            <div className="rightBar-main">
              {allMessages.length > 0 && (
                <>
                  {allMessages.map((msg) =>
                    user && user._id !== msg.sender._id ? (
                      <LeftText
                        key={msg._id}
                        content={msg.content}
                        name={msg.sender.name}
                        pic={msg.sender.pic}
                        time={format(msg.createdAt)}
                      />
                    ) : (
                      <RightText
                        key={msg._id}
                        content={msg.content}
                        name={user && user.name}
                        time={format(msg.createdAt)}
                      />
                    )
                  )}
                </>
              )}
            </div>
            <form className="rightBar-footer" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
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
