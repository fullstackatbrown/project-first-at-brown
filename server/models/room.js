const db = require('../config/db');

exports.read = (room_id) => db.oneOrNone(
  `SELECT *
      FROM room
      WHERE room_id = $1`,
  [room_id]
);

exports.readAll = () => db.any(
  `SELECT room.*, COUNT(prompt_response.room_id) AS num_responses
      FROM room
      LEFT JOIN prompt_response
      ON room.room_id = prompt_response.room_id
      WHERE room.expires_at > NOW()
      GROUP BY room.room_id
      ORDER BY room.created_at DESC`,
);

exports.create = ({ prompt, expires_at }) => db.one(
  `INSERT INTO room (prompt, expires_at)
      VALUES ($1, $2)
      RETURNING room_id`,
  [prompt, expires_at]
);

exports.createInterval = ({ prompt, interval }) => db.one(
  `INSERT INTO room (prompt, expires_at)
      VALUES ($1, NOW() + INTERVAL $2)
      RETURNING room_id`,
  [prompt, interval]
);

exports.update = (room_id, { prompt, expires_at }) => db.none(
  `UPDATE room
      SET prompt     = COALESCE($1, prompt),
          expires_at = COALESCE($2, expires_at)
      WHERE room_id  = $3`,
  [prompt, expires_at, room_id]
);

exports.delete = (room_id) => db.none(
  `DELETE
      FROM room
      WHERE room_id = $1`,
  [room_id]
);
