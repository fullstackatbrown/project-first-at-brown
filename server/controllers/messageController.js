const asyncHandler = require("express-async-handler");

const message = require("../models/message");

exports.post = asyncHandler(async (req, res, next) => {
    const body = req.body.body;
    const senderId = req.accountId;
    const recipientId = req.body.recipientId;

    const result = await message.create({
        body,
        sender_id: senderId,
        recipient_id: recipientId,
    });

    res.json({messageId: result.message_id});
})


