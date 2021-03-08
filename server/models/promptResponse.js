const db = require('../config/db');

// Returns true if created successfully, false otherwise
exports.create = ({ room_id, account_id, body, created_at }) => {
  const promptResponse = await db.oneOrNone(
    `SELECT * FROM prompt_response
        WHERE room_id = $1
        AND account_id = $2`
    [room_id, account_id]
  );

  if (promptResponse === null) {
    db.none(
      `INSERT INTO prompt_response (room_id, account_id, body, created_at)
          VALUES ($1, $2, $3, $4)`,
      [room_id, account_id, body, created_at]
    );
    return true;
  } else {
    return false;
  }
}

exports.update = ({ room_id, account_id }, { body, created_at }) => db.none(
  `UPDATE prompt_response
      SET body = $1, created_at = $2,
      WHERE room_id  = $3 AND account_id = $4`,
  [body, created_at, room_id, account_id]
);

exports.delete = ({ room_id, account_id }) => db.none(
  `DELETE
      FROM room
      WHERE room_id = $1 AND account_id = $2`,
  [room_id, account_id]
);

// Returns true if created successfully, false otherwise
exports.createReport = async ({prompt_response_room_id, prompt_response_account_id, reporter_account_id}) => {
  const report = await db.oneOrNone(
    `SELECT * FROM prompt_response_report
        WHERE prompt_response_room_id = $1
        AND prompt_response_account_id = $2
        AND reporter_account_id = $3`,
    [prompt_response_room_id, prompt_response_account_id, reporter_account_id]
  );

  if (report === null) {
    await db.none(
      `INSERT INTO prompt_response_report
          VALUES ($1, $2, $3)`,
      [prompt_response_room_id, prompt_response_account_id, reporter_account_id]
    )
    return true;
  } else {
    return false;
  }
}