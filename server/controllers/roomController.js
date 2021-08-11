const asyncHandler = require('express-async-handler');

const room = require('../models/room');
const promptResponse = require('../models/promptResponse');

const reportThreshold = 3;

exports.getRooms = asyncHandler(async (_req, res) => {
  const rooms = await room.readAll();
  res.json(rooms);
});

exports.getRoom = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;
  const roomData = await room.read(roomId);

  if (roomData === null) {
    res.status(404).json({ message: 'room not found' });
    return;
  }

  const responseData = await promptResponse.read(roomId);
  const accountId = req.accountId;

  let userResponse = null;
  const otherResponses = [];
  for (const response of responseData) {
    const numReports = response.num_reports;
    delete response.num_reports;
    if (response.account_id === accountId) {
      userResponse = response;
      response.report_threshold_exceeded = numReports >= reportThreshold;
    } else if (numReports < reportThreshold) {
      otherResponses.push(response);
    }
  }

  res.json({
    ...roomData,
    user_response: userResponse,
    responses: otherResponses,
  });
});

exports.createRoom = asyncHandler(async (req, res) => {
  const prompt = req.body.prompt;
  const expiresAt = req.body.expiresAt;

  const roomId = await room.create({ prompt, expires_at: expiresAt });

  if (roomId === null) {
    res.status(404);
    return;
  }

  res.json(roomId);
});

exports.updateRoom = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;
  const prompt = req.body.prompt;
  const expiresAt = req.body.expiresAt;

  const result = await room.update(roomId, { prompt, expires_at: expiresAt });

  res.json(result);
});

exports.deleteRoom = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;

  const result = await room.delete(roomId);

  res.json(result);
});
