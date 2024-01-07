const express = require("express");
const app = express();
const dotenv = require("dotenv");
const chats = require("./data");
const cors = require("cors");
const connectDB = require("./Config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
app.use(cors());

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.sent("yes");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3114;

app.listen(PORT, () => {
  console.log("Server Started on port number " + PORT);
});
