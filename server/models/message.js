const db = require('../config/db');

exports.create = ({ body, sender_id, recipient_id }) =>
  db.one(
    `INSERT INTO message (body, sender_id, recipient_id)
      VALUES ($1, $2, $3)
      RETURNING *`,
    [body, sender_id, recipient_id]
  );
