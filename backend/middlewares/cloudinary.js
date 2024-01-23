const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});
exports.uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, {
        resource_type: "auto",
        folder: folder,
      })
        .then((result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      });
  });
};
