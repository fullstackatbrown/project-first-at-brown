const asyncHandler = require("express-async-handler");

const message = require("../models/message");
const { emitMessage } = require("../socket/messagingHandler");

exports.post = asyncHandler(async (req, res) => {
  const body = req.body.body;
  const senderId = req.accountId;
  const recipientId = req.body.recipientId;

  const result = await message.create({
    body,
    sender_id: senderId,
    recipient_id: recipientId,
  });

  emitMessage(recipientId, result);

  res.json(result);
});
