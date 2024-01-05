import React, { useEffect, useState } from "react";
import "./myChatCard.css";
import { useChatContext } from "../Context/chatContext";

function MyChatCard({ senderName, handleFunction, myId }) {
  const { clickedUser } = useChatContext();
  const [isClicked, setIsClicked] = useState(false);
  console.log(myId, myId == clickedUser);

  //   useEffect(() => {
  //     setIsClicked(myId === clickedUser);
  //     console.log(isClicked);
  //   }, [clickedUser]);
  return (
    <div
      className="myChatCard"
      onClick={handleFunction}
      style={{ backgroundColor: myId == clickedUser ? "#1877f2" : "#fff" }}
    >
      <p className="name-user">{senderName}</p>
      <p className="unread-message-container">
        <span className="unread-message">{senderName}: </span>
        hi
      </p>
    </div>
  );
}

export default MyChatCard;
