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
      GROUP BY room.room_id`,
);

exports.create = ({ prompt, expires_at }) => db.oneOrNone(
  `INSERT INTO room (prompt, expires_at)
      VALUES ($1, $2)
      RETURNING room_id`,
  [prompt, expires_at]
);

exports.update = (room_id, { prompt, expires_at }) => db.none(
  `UPDATE room
      SET prompt     = $1,
          expires_at = $2,
      WHERE room_id  = $3`,
  [prompt, expires_at, room_id]
);

exports.delete = (room_id) => db.none(
  `DELETE
      FROM room
      WHERE room_id = $1`,
  [room_id]
);