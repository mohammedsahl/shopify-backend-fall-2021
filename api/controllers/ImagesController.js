/* eslint-disable */
/**
 * ImagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  upload: function (req, res) {
    if (req.method === "GET") {
      return res.json({
        status: "GET not allowed",
      });
    }
    var uploadFile = req.file("image");
    uploadFile.upload({ dirname: '../../assets/images' }, function whenDone(err, files) {
      if (err) console.error(err);

      for (const file of files) {
        Images.create({
          imageUploadFileDirectory: file.fd,
          imageFilename: file.fd.replace(/^.*[\\\/]/, ''),
          imageUploadMime: file.type,
          imageTitle: file.filename,
          imageTags: ["test"],
        }).exec(function (err) {
          if (err) return res.serverError(err);
        });
      }
      res.redirect('back')
    });
  },

  get: function (req, res) {
    Images.find({}).exec((err, images) => {
      if (err) res.send(500, {error: err})
      res.view('pages/list', {images: images})
    })
  },

  clickButton: function () {
    console.log("IN CLICK BUTTON")
  }
};
