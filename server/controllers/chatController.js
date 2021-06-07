const asyncHandler = require("express-async-handler");

const chat = require("../models/chat");

exports.getChats = asyncHandler(async (req, res, next) => {
  const result = await chat.list(req.accountId);

  // maps recipient id to messages
  res.json({ chats: result });
});

exports.getChat = asyncHandler(async (req, res, next) => {
  const recipientId = req.body.recipientId;

  const result = await chat.read({
    account_id1: req.accountId,
    account_id2: recipientId,
  });

  res.json({ messages: result });
});
