import React, { useContext, useEffect, useState } from "react";
import { useChatContext } from "../Context/chatContext";
import Top from "../Components/top/top";
import LeftBar from "../Components/leftBar/leftBar";
import RightBar from "../Components/rightBar/rightBar";
import { CiSquareRemove } from "react-icons/ci";
import "./chats.css";

function ChatsPage() {
  const { isPopUp, setIsPopUp, user } = useChatContext();
  return (
    <div className="chat-container">
      <Top />
      <div className={`bottom-container ${isPopUp && "hidden"}`}>
        <LeftBar />
        <RightBar />
      </div>
      {isPopUp && (
        <div className="profile-expand">
          <CiSquareRemove
            onClick={() => setIsPopUp(false)}
            className="remove-button"
          />
          <p className="profile-name">{user.name}</p>
          <img src={user.pic} alt="profile pic" className="profile-pic" />
          <p className="profile-email">
            <span className="email-title">Email: </span>
            {user.email}
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatsPage;
