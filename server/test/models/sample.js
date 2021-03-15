const { createDatabase } = require("../../utils/dbHelpers.js");

describe('Sample', () => {
  // Runs before EACH test below
  beforeEach(() => {
    // Return Promise (will await)
    return createDatabase(dbName);
  });

  // A sample test
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
});