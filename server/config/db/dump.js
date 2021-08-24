const pgp = require('pg-promise')({});
const path = require('path');

exports.dumpQueryFile = new pgp.QueryFile(path.join(__dirname, 'dump.sql'), {
  minify: true,
});

exports.dropQueryFile = new pgp.QueryFile(path.join(__dirname, 'drop.sql'), {
  minify: true,
});
