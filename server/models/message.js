const db = require('../config/db');

exports.create = ({ body, sender_id, recipient_id }) => db.one(
  `INSERT INTO message (body, sender_id, recipient_id)
      VALUES ($1, $2, $3)
      RETURNING message_id`,
  [body, sender_id, recipient_id]
);

exports.read = ({ sender_id, recipient_id }) => db.any(
  `SELECT *
      FROM message
      WHERE sender_id = $1 AND recipient_id = $2`,
  [sender_id, recipient_id]
);
