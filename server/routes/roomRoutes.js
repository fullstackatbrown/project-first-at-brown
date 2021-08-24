const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController');
const auth = require('../middleware/auth');

// GET /rooms
router.get('/rooms', auth, roomController.getRooms);

// GET /room/:roomId
router.get('/room/:roomId', auth, roomController.getRoom);

// POST /room
router.post('/room', auth, roomController.createRoom);

// PUT /room/:roomId
router.put('/room/:roomId', auth, roomController.updateRoom);

// DELETE /room/:roomId
router.delete('/room/:roomId', auth, roomController.deleteRoom);

module.exports = router;
