const { expect } = require('chai');
const { resetTables } = require('../../utils/dbHelpers.js');

function makeRoom(jwt, prompt, expiresAt) {
  return request
    .post('/room')
    .set('Authorization', 'Bearer ' + jwt)
    .send({ prompt, expiresAt });
}

const nextYear = new Date().getFullYear() + 1;

describe('Room Routes', () => {
  beforeEach(resetTables);
  after(resetTables);

  describe('POST /room', () => {
    it('creates a new room', async () => {
      const jwt = await registerAccount();
      const res = await makeRoom(
        jwt,
        "What's your favorite idea?",
        new Date('2021-01-01')
      ).expect(200);
      expect(res.body.room_id).to.eql(1);
    });
  });

  describe('GET /room/:roomId', () => {
    it('gets room information', async () => {
      const jwt = await registerAccount();
      await makeRoom(
        jwt,
        "What's your favorite color?",
        new Date('2021-01-01')
      ).expect(200);
      const res = await request
        .get('/room/1')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200);

      const { room_id, prompt } = res.body;
      expect({ room_id, prompt }).to.eql({
        room_id: 1,
        prompt: "What's your favorite color?",
      });
    });
  });

  describe('GET /rooms', () => {
    it('lists all unexpired rooms in descending order by creation date', async () => {
      const jwt = await registerAccount();
      await makeRoom(
        jwt,
        'Where are you from?',
        new Date(`${nextYear}-01-01`)
      ).expect(200);
      await makeRoom(
        jwt,
        'What is your favorite hobby?',
        new Date(`${nextYear}-01-01`)
      ).expect(200);
      const res = await request
        .get('/rooms')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200);

      const rooms = res.body.map(({ room_id, prompt, num_responses }) => ({
        room_id,
        prompt,
        num_responses,
      }));
      expect(rooms).to.eql([
        {
          room_id: 2,
          prompt: 'What is your favorite hobby?',
          num_responses: '0',
        },
        {
          room_id: 1,
          prompt: 'Where are you from?',
          num_responses: '0',
        },
      ]);
    });
  });

  describe('PUT /room/:roomId', () => {
    it('updates room information', async () => {
      const jwt = await registerAccount();
      await makeRoom(jwt, 'Where are you from?', new Date()).expect(200);
      await request
        .put('/room/1')
        .set('Authorization', 'Bearer ' + jwt)
        .send({
          prompt: 'What is your favorite animal?',
          expiresAt: new Date(),
        })
        .expect(200);
      const res = await request
        .get('/room/1')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200);
      expect(res.body.prompt).to.eql('What is your favorite animal?');
    });
  });

  describe('DELETE /room/:roomId', () => {
    it('deletes room information', async () => {
      const jwt = await registerAccount();
      await makeRoom(jwt, 'Where are you from?', new Date()).expect(200);
      await request
        .get('/room/1')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200);
      await request
        .delete('/room/1')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(200);
      const res = await request
        .get('/room/1')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(404);
      expect(res.body.message).to.eq('room not found');
    });
  });
});
