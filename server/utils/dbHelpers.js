const pgp = require('pg-promise')({});
const pgtools = require('pgtools');
const db = require('../config/db');
const { dumpQueryFile, dropQueryFile } = require('../config/db/dump');

exports.resetTables = async () => {
  await db.none(dropQueryFile);
  await db.none(dumpQueryFile);
};

const config = {
  host: 'localhost',
  port: 5432,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
};

exports.dropDatabase = async (dbName) => {
  try {
    await pgtools.dropdb(config, dbName);
  } catch {
    console.error('Warning: failed to drop database', dbName);
  }
};

exports.createDatabase = async (dbName) => {
  await this.dropDatabase(dbName);
  await pgtools.createdb(config, dbName);
  const db = pgp({ ...config, database: dbName });
  await db.none(dumpQueryFile);
};
