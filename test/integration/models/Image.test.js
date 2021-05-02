/* eslint-disable */
const assert = require('assert');

describe('Find images', () => {
  it('should not be empty', (done) => {
    Images.find().exec((err, images) => {
      assert.notStrictEqual(images.length, 0);
      done();
    });
  });
});