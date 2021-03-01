const asyncHandler = require("express-async-handler");

const room = require("../models/room");

exports.getRooms = asyncHandler(async (_req, res) => {
  const rooms = await room.readAll();
  res.json(rooms);
});

exports.getRoom = asyncHandler(async (req, res) => {
  const roomId = req.roomId;

  const room = await room.read(roomId);

  if (room === null) {
    res.status(404);
    return;
  }

  res.json(room);
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
  const roomId = req.roomId;
  const prompt = req.body.prompt;
  const expiresAt = req.body.expiresAt;

  const result = await room.update(roomId, { prompt, expires_at: expiresAt });

  res.json(result);
});

exports.deleteRoom = asyncHandler(async (req, res) => {
  const roomId = req.roomId;

  const result = await room.delete(roomId);

  res.json(result);
});
