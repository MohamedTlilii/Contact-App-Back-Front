const Post = require("../../models/Post");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    let { postBody } = req.body;
    const uploader = async (path) => await cloudinary.uploads(path, "posts");
    let { path } = req.file;
    const { url } = await uploader(path);
    fs.unlinkSync(path);
    const newPost = await new Post({
      postBody,
      image: url,
    });
    await newPost.save();
    res.status(200).json({ status: true, message: "post added successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
