const { expect } = require('chai');
const { describe, beforeEach, after, it } = require('mocha');
const { resetTables } = require('../../utils/dbHelpers.js');
const app = require('../../server.js');
const supertest = require('supertest');
const request = supertest(app);
const { registerAccount } = require('../helpers');

describe('Account Routes', () => {
  beforeEach(resetTables);
  after(resetTables);

  describe('GET /', () => {
    it('returns a 404', async () => {
      const res = await request.get('/').expect(404);
      expect(res.body.message).to.eql('route not found');
    });
  });

  describe('POST /account', () => {
    it('registers an account', async () => {
      const res = await request
        .post('/account')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          year: '2025',
          hometown: 'Computer Science',
          pronouns: 'she/her/hers',
          bio: 'Swimmer, baker, and pianist',
          email: 'jane_doe@brown.edu',
          token: 'abc123',
        })
        .expect(201);
      expect(res.body.accountId).to.eql(1);
      const res1 = await request
        .post('/account')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          year: '2025',
          hometown: 'Computer Science',
          pronouns: 'she/her/hers',
          bio: 'Swimmer, baker, and pianist',
          email: 'jane_doe@brown.edu',
          token: 'abc1234',
        })
        .expect(400);
      expect(res1.body.error).to.exist;
      const res2 = await request
        .post('/account')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          year: '2025',
          hometown: 'Computer Science',
          pronouns: 'she/her/hers',
          bio: 'Swimmer, baker, and pianist',
          email: 'jane_doe1@brown.edu',
          token: 'abc123',
        })
        .expect(400);
      expect(res2.body.error).to.exist;
    });
  });

  describe('POST /account/login', () => {
    it('logs in', async () => {
      await registerAccount();
      await request
        .post('/account/login')
        .send({
          token: 'bad token',
        })
        .expect(401);
      const res = await request
        .post('/account/login')
        .send({
          token: 'abc123',
        })
        .expect(200);
      expect(res.body.accountId).to.eql(1);
    });
  });

  describe('GET /account/:accountId', () => {
    it('gets account information', async () => {
      const jwt = await registerAccount();
      const res = await request
        .get('/account/1')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200);
      expect(res.body.account_id).to.eql(1);
      expect(res.body.first_name).to.eql('Jane');
    });
  });

  describe('PUT /account', () => {
    it('updates account information', async () => {
      const jwt = await registerAccount();
      await request
        .put('/account')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          firstName: 'Jorge',
        })
        .expect(200);
      const res = await request
        .get('/account/1')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200);
      expect(res.body.account_id).to.eql(1);
      expect(res.body.first_name).to.eql('Jorge');
      expect(res.body.last_name).to.eql('Doe');
    });
  });

  describe('GET /accounts', () => {
    it('gets multiple account information', async () => {
      const jwt = await registerAccount();
      await request
        .post('/account')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          year: '2025',
          hometown: 'Computer Science',
          pronouns: 'she/her/hers',
          bio: 'Swimmer, baker, and pianist',
          email: 'jane_doe1@brown.edu',
          token: 'abc1234',
        })
        .expect(201);
      await request
        .post('/account')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          year: '2025',
          hometown: 'Computer Science',
          pronouns: 'she/her/hers',
          bio: 'Swimmer, baker, and pianist',
          email: 'jane_doe2@brown.edu',
          token: 'abc12345',
        })
        .expect(201);
      const res = await request
        .get('/accounts')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          accountIds: [1, 3, 47],
        })
        .expect(200);
      expect(res.body.length).to.eql(2);
      expect(res.body[0].account_id).to.eql(1);
      expect(res.body[1].account_id).to.eql(3);
    });
  });
});
