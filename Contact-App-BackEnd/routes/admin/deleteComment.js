const Comment = require("../../models/Comment");
module.exports = async (req, res) => {
  try {
    let { commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    res
      .status(200)
      .json({ status: true, message: "comment was deleted successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
