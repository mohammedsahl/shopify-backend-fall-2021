/* eslint-disable */
const sails = require('sails');

// Before running any tests...
before(function (done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift({
    port: 7331,
    hooks: { grunt: false },
    log: { level: 'warn' },
    models: {
      connection: 'testdb',
      migrate: 'drop'
    },
  }, async (err) => {
    if (err) { return done(err); }
    const image = await Images.create({
      filename: 'Test',
      imageUploadFileDirectory: 'Test',
      imageFilename: 'test.png',
      imageUploadMime: 'image/png',
      imageTitle: 'Test Image',
      imageTags: ["test"],
    }).fetch();
    this.testImageID = image.id
    return done();
  });
});

// After all tests have finished...
after(function(done) {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});