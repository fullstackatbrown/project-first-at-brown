const db = require('../config/db');

// TODO: unfinished

exports.read = (room_id) => db.one(
  `SELECT *
      FROM room
      WHERE room_id = $1`,
  [room_id]
);

exports.create = ({ prompt, expires_at }) => db.one(
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

// exports.read(1).then(console.log);