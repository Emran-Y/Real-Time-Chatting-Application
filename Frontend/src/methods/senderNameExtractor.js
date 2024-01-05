const senderNameExtractor = (userId, usersArray) => {
  const sender = usersArray.find((user) => user._id !== userId);
  return sender.name;
};

export default senderNameExtractor;
