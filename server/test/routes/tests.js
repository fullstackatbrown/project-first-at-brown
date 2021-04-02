const { expect } = require("chai");
const { resetTables } = require("../../utils/dbHelpers.js");

describe('Account Routes', () => {
  beforeEach(resetTables);
  afterEach(resetTables);

  describe('GET /', () => {
    it('returns a 404', async () => {
      const res = await request.get('/')
        .expect(404);
      expect(res.body.message).to.eql("route not found");
    });
  });

  describe('POST /account', () => {
    it('registers an account', async () => {
      const res = await request.post('/account')
        .send({
          firstName: "Jane",
          lastName: "Doe",
          year: "2025",
          concentration: "Computer Science",
          pronouns: "she/her/hers",
          email: "jane_doe@brown.edu",
          token: "abc123",
        })
        .expect(201)
      expect(res.body.accountId).to.eql(1);
    });
  });

  describe('POST /account/login', () => {
    it('logs in', async () => {
      await registerAccount();
      const res = await request.post('/account/login')
        .send({
          token: "abc123",
        })
        .expect(200)
      expect(res.body.accountId).to.eql(1);
    });
  });

  describe('GET /account/:accountId', () => {
    it('gets account information', async () => {
      const jwt = await registerAccount();
      const res = await request.get('/account/1')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200)
      expect(res.body.account_id).to.eql(1);
      expect(res.body.first_name).to.eql("Jane");
    });
  });
});