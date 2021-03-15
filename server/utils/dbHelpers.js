const pgp = require("pg-promise")({});
const pgtools = require("pgtools");
const path = require("path");

const config = {
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,  
};

exports.dropDatabase = async (dbName) => {
  try {
    await pgtools.dropdb(config, dbName);
  } catch {
    console.error("Warning: failed to drop database", dbName);
  }
};

exports.createDatabase = async (dbName) => {
  await this.dropDatabase(dbName);
  await pgtools.createdb(config, dbName);
  const db = pgp({ ...config, database: dbName });
  await db.none(
    new pgp.QueryFile(path.join(__dirname, "../config/db/dump.sql"), {
      minify: true,
    })
  );
};