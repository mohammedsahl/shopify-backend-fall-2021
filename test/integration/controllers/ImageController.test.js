/* eslint-disable */
var supertest = require("supertest");

describe("ImageController", function() {
    describe("#Pages", () => {
      it("should redirect to /", (done) => {
        supertest(sails.hooks.http.app).get("/").expect(200, done);
      });
      it("should redirect to /images/upload", (done) => {
        supertest(sails.hooks.http.app).get("/images/upload").expect(200, done);
      });
      it("should redirect to /images/list", (done) => {
        supertest(sails.hooks.http.app).get("/images/list").expect(200, done);
      });
    });

    describe("#API", () => {
      it("should get one image", (done) => {
        supertest(sails.hooks.http.app).get("/images/list").expect(200, done);
      });
      it("should query one image", (done) => {
        supertest(sails.hooks.http.app).get("/images/list").query({ searchWord: 'Test' })
        .expect(200, done);
      });
      it("should upload one image", (done) => {
        supertest(sails.hooks.http.app).post("/images/upload").send({
          filename: "uploadtest",
          imageUploadFileDirectory: 'test Directory',
          imageFilename: 'uploadtest.png',
          imageUploadMime: 'image/png',
          imageTitle: 'Test upload title',
          imageTags: ["test"]
        }).expect(302, done);
      });
      it("should delete one image", (done) => {
        supertest(sails.hooks.http.app).post("/images/delete/:id")
        .send({id: this.parent.ctx.testImageID})
        .expect(302, done);
      });
    });
  });
