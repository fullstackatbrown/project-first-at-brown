require('dotenv').config({ path: '../.env' });
const room = require('../models/room');
const { getQuestion } = require('random-questions');

(async () => {
  var today = new Date();
  today.setHours(today.getHours() + 4);
  await room.create({ prompt: getQuestion(), expires_at: today });
})();
