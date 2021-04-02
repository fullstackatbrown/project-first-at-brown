const supertest = require('supertest');
const app = require('../server.js');
const chai = require('chai');

if (process.env.POSTGRES_DATABASE !== "test") {
  throw new Error("Please use POSTGRES_DATABASE=test when testing");
}

global.request = supertest(app);
global.expect = chai.expect;

// Helper for registering an account, returning the auth token
global.registerAccount = async () => {
  const res = await request.post('/account')
    .send({
      firstName: "Jane",
      lastName: "Doe",
      year: "2025",
      concentration: "Computer Science",
      pronouns: "she/her/hers",
      email: "jane_doe@brown.edu",
      token: "abc123",
    });
  return res.body.token;
};