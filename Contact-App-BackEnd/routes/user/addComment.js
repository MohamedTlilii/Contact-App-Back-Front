const Comment = require("../../models/Comment");

module.exports = async (req, res) => {
  try {
    let { commentBody } = req.body;
    let { id } = req.user;
    let { postId } = req.params;
    const newComment = await new Comment({
      commentBody,
      userId: id,
      postId,
    });
    await newComment.save();
    res.status(200).json({ status: true, data: newComment });
  } catch (error) {
    res.status(401).json({ status: false, error });
  }
};
