const pgp = require('pg-promise')({});

module.exports = pgp({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});
