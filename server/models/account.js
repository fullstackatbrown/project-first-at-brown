const db = require('../config/db');

exports.login = (token) => db.one(
  `SELECT *
      FROM account
      WHERE token = $1`,
  [token]
);

exports.create = ({ first_name, last_name, year, picture, concentration, pronouns, token, email }) => db.one(
  `INSERT INTO account (first_name, last_name, year, picture, concentration, pronouns, token, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING account_id`,
  [first_name, last_name, year, picture, concentration, pronouns, token, email]
);

exports.read = (account_id) => db.one(
  `SELECT *
      FROM account
      WHERE account_id = $1`,
  [account_id]
);

exports.update = (account_id, { first_name, last_name, year, picture, concentration, pronouns }) => db.none(
  `UPDATE account
      SET first_name    = $1,
          last_name     = $2,
          year          = $3,
          picture       = $4,
          concentration = $5,
          pronouns      = $6,
      WHERE account_id  = $7`,
  [first_name, last_name, year, picture, concentration, pronouns, account_id]
);

exports.delete = (account_id) => db.none(
  `DELETE
      FROM account
      WHERE account_id = $1`,
  [account_id]
);
