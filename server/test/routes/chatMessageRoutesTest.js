const { expect } = require('chai');
const { describe, beforeEach, after, it } = require('mocha');
const { resetTables } = require('../../utils/dbHelpers.js');
const app = require('../../server.js');
const supertest = require('supertest');
const request = supertest(app);
const { registerAccount } = require('../helpers');

describe('Chat and Message Routes', () => {
  beforeEach(resetTables);
  after(resetTables);

  describe('POST /message', () => {
    it('sends a message', async () => {
      const jwt = await registerAccount();
      await request
        .post('/account')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          year: '2025',
          concentration: 'Computer Science',
          pronouns: 'she/her/hers',
          bio: 'Swimmer, baker, and pianist',
          email: 'jane_doe1@brown.edu',
          token: 'abc1234',
        })
        .expect(201);
      const res = await request
        .post('/message')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          body: 'hello',
          recipientId: '2',
        })
        .expect(200);
      expect(res.body.messageId).to.eql(1);
    });
  });

  describe('POST /chats', () => {
    it('gets all chats', async () => {
      const jwt = await registerAccount();
      const res = await request
        .post('/account')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          year: '2025',
          concentration: 'Computer Science',
          pronouns: 'she/her/hers',
          bio: 'Swimmer, baker, and pianist',
          email: 'jane_doe1@brown.edu',
          token: 'abc1234',
        })
        .expect(201);

      await request
        .post('/message')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          body: 'hello',
          recipientId: '2',
        })
        .expect(200);

      const res1 = await request
        .get('/chats')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200);
      expect(res1.body.chats.length).to.eql(1);
      const chat1 = res1.body.chats[0];
      expect(chat1.firstName).to.eql('John');
      expect(chat1.messages[0].body).to.eql('hello');

      const res2 = await request
        .get('/chats')
        .set('Authorization', 'Bearer ' + res.body.token)
        .expect(200);
      expect(res2.body.chats.length).to.eql(1);
      const chat2 = res2.body.chats[0];
      expect(chat2.firstName).to.eql('Jane');
      expect(chat2.messages[0].body).to.eql('hello');
    });
  });

  describe('POST /chat', () => {
    it('gets a chat', async () => {
      const jwt = await registerAccount();
      const res = await request
        .post('/account')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          year: '2025',
          concentration: 'Computer Science',
          pronouns: 'she/her/hers',
          bio: 'Swimmer, baker, and pianist',
          email: 'jane_doe1@brown.edu',
          token: 'abc1234',
        })
        .expect(201);

      await request
        .post('/message')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          body: 'hello',
          recipientId: '2',
        })
        .expect(200);

      const res1 = await request
        .get('/chat')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          recipientId: 2,
        })
        .expect(200);
      const messages1 = res1.body.messages;
      expect(messages1.length).to.eql(1);
      expect(messages1[0].body).to.eql('hello');

      const res2 = await request
        .get('/chat')
        .set('Authorization', 'Bearer ' + res.body.token)
        .send({
          recipientId: 1,
        })
        .expect(200);
      const messages2 = res2.body.messages;
      expect(messages2.length).to.eql(1);
      expect(messages2[0].body).to.eql('hello');
    });
  });
});
