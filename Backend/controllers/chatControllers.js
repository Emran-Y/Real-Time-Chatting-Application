const { model } = require("mongoose");
const Chat = require("../Models/chatModel");

const accessChat = async (req, res) => {
  const userId = req.body.userId;

  if (!userId) {
    console.log("User id is not sent in the body");
    return res.sendStatus(400);
  }

  const theChat = await Chat.find({
    isGroupChat: false,
    users: { $all: [req.user._id, userId] },
  }).populate("users");

  if (theChat.length > 0) {
    return res.status(200).json(theChat);
  } else {
    try {
      const newChat = new Chat({
        chatName: "sender",
        isGroupChat: false,
        users: [userId, req.user._id],
      });
      const savedNewChat = await newChat.save();
      res.status(200).json(savedNewChat);
    } catch (error) {
      console.error(error);
    }
  }
};

const getMyChats = async (req, res) => {
  const myChats = await Chat.find({
    users: { $in: [req.user._id] },
  });

  res.status(200).json(myChats);
};

module.exports.accessChat = accessChat;
module.exports.getMyChats = getMyChats;
