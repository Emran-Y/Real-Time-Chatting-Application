const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { accessChat, getMyChats } = require("../controllers/chatControllers");
const router = express.Router();

// Chat creation route

router.route("/").post(protect, accessChat);

// // get the avalible chat a particular user is in -> get
router.route("/mychat").get(protect, getMyChats);

// // Creation of Group chat -> post
// router.route("/group").post(protect, createGroupChat);

// // rename of Group chat -> put
// router.route("/rename").put(protect, renameGroup);

// // Add memmber to Group chat -> put
// router.route("/groupadd").put(protect, addToGroup);

// // Remove from group chat -> put
// router.route("/groupremove").put(protect, removeFromGroup);

module.exports = router;
