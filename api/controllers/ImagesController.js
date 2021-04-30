/* eslint-disable */
/**
 * ImagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  upload: function (req, res) {
    const fs = require('fs');
    if (req.method === "GET") {
      return res.json({
        status: "GET not allowed",
      });
    }
    var uploadFile = req.file("image");
    uploadFile.upload({ dirname: process.cwd() + '/assets/images/uploads/' }, function whenDone(err, files) {
      if (err) return res.send(500,err);

      for (const file of files) {
        const filename = file.fd.substring(file.fd.lastIndexOf('\\') + 1)
        const uploadLocation = process.cwd() +'/assets/images/uploads/' + filename;
        const tempLocation = process.cwd() + '/.tmp/public/images/uploads/' + filename;
        fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
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
      res.redirect('/images/list')
    });
  },

  get: function (req, res) {
    Images.find({}).exec((err, images) => {
      if (err) res.send(500, {error: err})
      res.view('pages/list', {images: images})
    })
  },

  delete: function (req, res) {
    const fs = require('fs');
    Images.find({id:req.params.id}).exec((err, image) => {
      Images.destroy({id:req.params.id}).exec((err) => {
        if (err) res.send(500, {error: 'Database Error'});
        try {
          const uploadLocation = process.cwd() +'/assets/images/uploads/' + image[0].imageFilename;
          const tempLocation = process.cwd() + '/.tmp/public/images/uploads/' + image[0].imageFilename;
          fs.unlinkSync(uploadLocation);
          fs.unlinkSync(tempLocation);
        } catch (err) {
        }

        res.redirect('/images/list')
      })
    });
    return false
  }
};
