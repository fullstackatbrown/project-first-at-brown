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

exports.createReport = async ({prompt_response_room_id, prompt_response_account_id, reporter_account_id}) => {
  const report = await db.oneOrNone(
    `SELECT * FROM prompt_response_report
        WHERE prompt_response_room_id = $1
        AND prompt_response_account_id = $2
        AND reporter_account_id = $3`,
    [prompt_response_room_id, prompt_response_account_id, reporter_account_id]
  );

  if (report === null) {
    return false;
  } else {
    await db.none(
      `INSERT INTO prompt_response_report
          VALUES ($1, $2, $3)`,
      [prompt_response_room_id, prompt_response_account_id, reporter_account_id]
    )
    return true;
  }
}