const db = require('../config/db');

exports.create = ({ body, id_to, id_from }) => db.one(
  `INSERT INTO message (body, sender_id, recipient_id)
      VALUES ($1, $2, $3)
      RETURNING message_id`,
  [body, id_to, id_from]
);

exports.read = (account_id) => db.any(
  `SELECT *
      FROM message
      WHERE sender_id = $1 OR recipient_id = $1`,
  [account_id]
);

exports.update = ({ message_id, body }) => db.none(
  `UPDATE message
      SET body          = $2
      WHERE message_id  = $1`,
  [message_id, body]
);

exports.delete = (message_id) => db.none(
  `DELETE
      FROM message
      WHERE message_id = $1`,
  [message_id]
);
