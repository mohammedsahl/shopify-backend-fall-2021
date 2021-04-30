/* eslint-disable */
var supertest = require("supertest");

describe("ImageController", () => {
  describe("#homepage", () => {
    it("should redirect to /", (done) => {
      supertest(sails.hooks.http.app).get("/").expect(200, done);
    });
  });
});
