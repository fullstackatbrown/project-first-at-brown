const asyncHandler = require("express-async-handler");

const promptResponse = require("../models/promptResponse");

exports.createPromptResponse = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;

  const createSuccess = await promptResponse.create({
    room_id: roomId,
    account_id: req.accountId,
    body: req.body.body
  });

  res.json({createSuccess});
});

exports.updatePromptResponse = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;

  const result = await promptResponse.update({
    room_id: roomId,
    account_id: req.accountId,
    body: req.body.body
  });

  res.json(result);
});

exports.deletePromptResponse = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;

  const result = await promptResponse.delete({
    room_id: roomId,
    account_id: req.accountId
  });

  res.json(result);
});

exports.reportPromptResponse = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;
  const authorId = req.params.accountId;
  const reporterId = req.accountId;

  const reportSuccess = await promptResponse.createReport({
    prompt_response_room_id: roomId,
    prompt_response_account_id: authorId,
    reporter_account_id: reporterId
  });

  res.json({reportSuccess});
});
