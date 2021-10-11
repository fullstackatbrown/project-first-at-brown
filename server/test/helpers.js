const app = require('../server.js');
const supertest = require('supertest');
const request = supertest(app);

if (process.env.POSTGRES_DATABASE !== 'test') {
  throw new Error('Please use POSTGRES_DATABASE=test when testing');
}

// Helper for registering an account, returning the auth token
module.exports.registerAccount = async () => {
  const res = await request.post('/account').send({
    firstName: 'Jane',
    lastName: 'Doe',
    year: '2025',
    concentration: 'Computer Science',
    pronouns: 'she/her/hers',
    bio: 'Swimmer, baker, and pianist',
    email: 'jane_doe@brown.edu',
    token: 'abc123',
  });
  return res.body.token;
};
