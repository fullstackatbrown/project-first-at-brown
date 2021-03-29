const { expect } = require("chai");
const { resetTables } = require("../../utils/dbHelpers.js");

describe('Account Routes', () => {
  before(resetTables);
  after(resetTables);
  let jwt = null;

  describe('GET /', () => {
    it('returns a 404', (done) => {
      request.get('/')
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.eql("route not found");
          done(err);
        });
    });
  });

  describe('POST /account', () => {
    it('registers an account', (done) => {
      request.post('/account')
        .send({
          firstName: "Jane",
          lastName: "Doe",
          year: "2025",
          concentration: "Computer Science",
          // pronouns: "",
          email: "jane_doe@brown.edu",
          token: "abc123",
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.accountId).to.eql(1);
          done(err);
        });
    });
  });

  describe('POST /account/login', () => {
    it('logs in', (done) => {
      request.post('/account/login')
        .send({
          token: "abc123",
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.accountId).to.eql(1);
          jwt = res.body.token;
          done(err);
        });
    });
  });

  describe('GET /account/:accountId', () => {
    it('gets account information', (done) => {
      request.get('/account/1')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200)
        .end((err, res) => {
          expect(res.body.account_id).to.eql(1);
          expect(res.body.first_name).to.eql("Jane");
          done(err);
        });
    });
  });
});