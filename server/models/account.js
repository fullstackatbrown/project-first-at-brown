const db = require('../config/db');

exports.login = (token) =>
  db.oneOrNone(
    `SELECT *
      FROM account
      WHERE token = $1`,
    [token]
  );

exports.create = async ({
  first_name,
  last_name,
  year,
  picture,
  concentration,
  pronouns,
  bio,
  token,
  email,
}) => {
  const existingAccountWithToken = await db.oneOrNone(
    `SELECT * FROM account WHERE token = $1`,
    [token]
  );
  if (existingAccountWithToken != null) {
    return { error: 'Account with authentication token already exists' };
  }

  const existingAccountWithEmail = await db.oneOrNone(
    `SELECT * FROM account WHERE email = $1`,
    [email]
  );
  if (existingAccountWithEmail != null) {
    return { error: "Account with the email '" + email + "' already exists" };
  }

  return db.one(
    `INSERT INTO account (first_name, last_name, year, picture, concentration, pronouns, bio, token, email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING account_id`,
    [
      first_name,
      last_name,
      year,
      picture,
      concentration,
      pronouns,
      bio,
      token,
      email,
    ]
  );
};

exports.read = (account_id) =>
  db.oneOrNone(
    `SELECT *
      FROM account
      WHERE account_id = $1`,
    [account_id]
  );

exports.update = (
  account_id,
  { first_name, last_name, year, picture, concentration, pronouns, bio }
) =>
  db.none(
    `UPDATE account
      SET first_name    = COALESCE($1, first_name),
          last_name     = COALESCE($2, last_name),
          year          = COALESCE($3, year),
          picture       = COALESCE($4, picture),
          concentration = COALESCE($5, concentration),
          pronouns      = COALESCE($6, pronouns),
          bio           = COALESCE($7, bio)
      WHERE account_id  = $8`,
    [
      first_name,
      last_name,
      year,
      picture,
      concentration,
      pronouns,
      bio,
      account_id,
    ]
  );

exports.delete = (account_id) =>
  db.none(
    `DELETE
      FROM account
      WHERE account_id = $1`,
    [account_id]
  );
