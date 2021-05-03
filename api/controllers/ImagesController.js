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

    // Get uploaded file
    const uploadFile = req.file("image");

    //Upload and process filfe
    uploadFile.upload({ dirname: process.cwd() + '/assets/images/uploads/' }, function whenDone(err, files) {

      // Send error if needed
      if (err) return res.send(500,err);

      // Iterate through files
      for (const file of files) {

        // Get filename and directories for temp storage and then upload
        const filename = file.fd.substring(file.fd.lastIndexOf('\\') + 1)
        const uploadLocation = process.cwd() +'/assets/images/uploads/' + filename;
        const tmpLocation = process.cwd() + '/.tmp/public/images/uploads/' + filename;
        fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tmpLocation));

        // Create new image record
        Images.create({
          filename: file.filename,
          imageUploadFileDirectory: file.fd,
          imageFilename: file.fd.replace(/^.*[\\\/]/, ''),
          imageUploadMime: file.type,
          imageTitle: req.body.imageTitle,
          imageTags: req.body.imageTags.split(','),
        }).exec(function (err) {
          if (err) return res.serverError(err);
        });
      }

      // Go back to list page
      res.redirect('/images/list')
    });

    //Good practice
    return false;
  },

  get: function (req, res) {
    query = req?.query?.searchWord
      ? {
          or: [
            { filename: { contains: req.query.searchWord } },
            { imageTitle: { contains: req.query.searchWord } },
            { imageTags: { contains: req.query.searchWord } },
          ],
        }
      : {};

    Images.find(query).exec((err, images) => {
      if (err) res.send(500, { error: err });
      res.view("pages/list", { images: images });
    });

    //Good practice
    return false;
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

    //Good practice
    return false
  }
};
