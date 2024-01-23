const Post = require("../../models/Post");
module.exports = async (req, res) => {
  try {
    let posts = await Post.find();
    res.status(200).json({ status: true, data: posts });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
