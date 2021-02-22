const pgp = require("pg-promise")({});
const pgtools = require("pgtools");
const path = require("path");

const config = {
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  host: "localhost",
};

exports.dropDatabase = async (dbName) => {
  try {
    await pgtools.dropdb(config, dbName);
  } catch {
    console.error("Failed to drop database", dbName);
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
  console.log("Done generating database", dbName);
};
