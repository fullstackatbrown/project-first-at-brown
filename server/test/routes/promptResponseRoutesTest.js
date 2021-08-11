const { expect } = require('chai');
const { resetTables } = require('../../utils/dbHelpers.js');

function makeRoom(jwt, prompt, expiresAt) {
  return request
    .post('/room')
    .set('Authorization', 'Bearer ' + jwt)
    .send({ prompt, expiresAt });
}

describe('Room Routes', () => {
  beforeEach(resetTables);
  after(resetTables);

  describe('POST /prompt/:roomId', () => {
    it('creates a new prompt response', async () => {
      const jwt = await registerAccount();
      await makeRoom(
        jwt,
        "What's your favorite idea?",
        new Date('2021-01-01')
      ).expect(200);

      const res = await request
        .post('/prompt/1')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          body: 'Ice cream!',
        })
        .expect(200);
      expect(res.body['createSuccess']).to.be.true;
    });
  });

  describe('PUT /prompt/:roomId', () => {
    it('updates a prompt response', async () => {
      const jwt = await registerAccount();
      await makeRoom(
        jwt,
        "What's your favorite idea?",
        new Date('2021-01-01')
      ).expect(200);

      await request
        .post('/prompt/1')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          body: 'Ice cream!',
        })
        .expect(200);

      const res = await request
        .put('/prompt/1')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          body: 'Pizza!',
        })
        .expect(200);
      expect(res.body.body).to.eql('Pizza!');
    });
  });

  describe('DELETE /prompt/:roomId', () => {
    it('deletes a prompt response', async () => {
      const jwt = await registerAccount();
      await makeRoom(
        jwt,
        "What's your favorite idea?",
        new Date('2021-01-01')
      ).expect(200);

      await request
        .post('/prompt/1')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          body: 'Ice cream!',
        })
        .expect(200);

      const res = await request
        .delete('/prompt/1')
        .set('Authorization', 'Bearer ' + jwt)
        .send()
        .expect(200);
      expect(res.body).to.eql(null);
    });
  });

  describe('POST /prompt/:roomId/report/:accountId', () => {
    it('reports a prompt response', async () => {
      const jwt = await registerAccount();
      await makeRoom(
        jwt,
        "What's your favorite idea?",
        new Date('2021-01-01')
      ).expect(200);

      await request
        .post('/prompt/1')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          body: 'Ice cream!',
        })
        .expect(200);

      // Note: this is a "self-report"
      const res = await request
        .post('/prompt/1/report/1')
        .set('Authorization', 'Bearer ' + jwt)
        .send()
        .expect(200);
      expect(res.body.reportSuccess).to.be.true;
    });
  });
});
