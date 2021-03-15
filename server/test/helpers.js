const supertest = require('supertest');
const app = require('../server.js');
const chai = require('chai');

// Set database to "test"
global.dbName = "test";
process.env.POSTGRES_DATABASE = "test";

global.request = supertest(app);
global.expect = chai.expect;