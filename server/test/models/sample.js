describe('Sample', function() {
  // A sample test
  describe('GET /', function() {
    it('returns a 404', function(done) {
      request.get('/')
        .expect(404)
        .end(function(err, res) {
          expect(res.body.message).to.eql("route not found");
          done(err);
        });
    });
  });
});