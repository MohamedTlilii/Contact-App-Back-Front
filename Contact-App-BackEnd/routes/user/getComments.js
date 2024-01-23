const Comment = require("../../models/Comment");
module.exports = async (req, res) => {
  try {
    let { postId } = req.params;
    let comments = await Comment.find({ postId }).populate(
      "userId",
      "userName imageUrl"
    );
    res.status(200).json({ status: true, data: comments });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
