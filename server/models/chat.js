const db = require("../config/db");

exports.read = ({ account_id1, account_id2 }) =>
  db.any(
    `SELECT *
      FROM message
      WHERE (sender_id = $1 AND recipient_id = $2)
      OR    (sender_id = $2 AND recipient_id = $1)
      ORDER BY created_at DESC`,
    [account_id1, account_id2]
  );

exports.list = (account_id) =>
  db.any(
      `SELECT *
      FROM message
      WHERE sender_id = $1 OR recipient_id = $1
      ORDER BY created_at DESC`,
      [account_id]
    ).then((messages) => {
      const chats = {};
      for (const message of messages) {
        const { sender_id, recipient_id } = message;
        const partner_id = account_id === sender_id ? recipient_id : sender_id;
        if (!(partner_id in chats)) {
          chats[partner_id] = [];
        }
        chats[partner_id].push(message);
      }
      return chats;
    });
