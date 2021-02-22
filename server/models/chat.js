const db = require('../config/db');

exports.list = (account_id) => db.any(
  `SELECT *
      FROM message
      WHERE sender_id = $1 OR recipient_id = $1
      ORDER BY created_at`,
  [account_id]
).then(messages => {
  const chats = new Map();
  for (const message of messages) {
    const { sender_id, recipient_id } = message;
    const partner_id = (account_id === sender_id) ? recipient_id : sender_id;
    if (!chats.has(partner_id)) {
      chats.set(partner_id, []);
    }
    chats.get(partner_id).push(message);
  }
  return chats;
});
