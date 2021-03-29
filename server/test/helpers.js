const supertest = require('supertest');
const app = require('../server.js');
const chai = require('chai');

if (process.env.POSTGRES_DATABASE !== "test") {
  throw new Error("Please use POSTGRES_DATABASE=test when testing");
}

global.request = supertest(app);
global.expect = chai.expect;