const db = require('../config/db');

const account = require('./account');

exports.read = ({ account_id1, account_id2 }) =>
  db.any(
    `SELECT *
      FROM message
      WHERE (sender_id = $1 AND recipient_id = $2)
      OR    (sender_id = $2 AND recipient_id = $1)
      ORDER BY created_at DESC`,
    [account_id1, account_id2]
  );

exports.list = async (account_id) => {
  const messages = await db.any(
    `SELECT *
      FROM message
      WHERE sender_id = $1 OR recipient_id = $1
      ORDER BY created_at DESC`,
    [account_id]
  );

  const chats = {};
  const chatOrder = []; // list of partner ids, with most recent conversations first
  for (const message of messages) {
    const { sender_id, recipient_id } = message;
    const partner_id = account_id === sender_id ? recipient_id : sender_id;

    if (!(partner_id in chats)) {
      chatOrder.push(partner_id);
      const partnerAccount = await account.read(partner_id);
      chats[partner_id] = {
        accountId: partnerAccount.account_id,
        firstName: partnerAccount.first_name,
        lastName: partnerAccount.last_name,
        year: partnerAccount.year,
        picture: partnerAccount.picture,
        concentration: partnerAccount.concentration,
        pronouns: partnerAccount.pronouns,
        bio: partnerAccount.bio,
        messages: [],
      };
    }

    chats[partner_id].messages.push(message);
  }

  const orderedChats = [];
  for (const id of chatOrder) {
    orderedChats.push(chats[id]);
  }
  return orderedChats;
};
