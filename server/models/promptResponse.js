const db = require('../config/db');


exports.read = (room_id) => db.any(
  `SELECT room.prompt, prompt_response.*,
      first_name, last_name, year, picture, concentration, pronouns,
      COUNT(prompt_response_report.reporter_account_id) AS num_reports
      FROM room
      INNER JOIN prompt_response
      ON room.room_id = prompt_response.room_id
      INNER JOIN account
      ON prompt_response.account_id = account.account_id
      LEFT JOIN prompt_response_report
      ON prompt_response.room_id = prompt_response_room_id
      AND prompt_response.account_id = prompt_response_account_id
      WHERE room.room_id = $1
      GROUP BY prompt_response_room_id, prompt_response_account_id, room.prompt,
      prompt_response.room_id, prompt_response.account_id, prompt_response.body, prompt_response.created_at,
      first_name, last_name, year, picture, concentration, pronouns
      ORDER BY prompt_response.created_at DESC`,
  [room_id]
);

// Returns true if created successfully, false otherwise
exports.create = async ({ room_id, account_id, body, created_at }) => {
  const promptResponse = await db.oneOrNone(
    `SELECT * FROM prompt_response
        WHERE room_id = $1
        AND account_id = $2`,
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
      SET body = COALESCE($1, body), created_at = COALESCE($2, created_at),
      WHERE room_id = $3 AND account_id = $4`,
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