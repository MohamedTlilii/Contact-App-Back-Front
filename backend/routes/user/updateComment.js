const Comment = require("../../models/Comment");
module.exports = async (req, res) => {
  try {
    let { commentId } = req.params;

    await Comment.findByIdAndUpdate(commentId, {
      $set: {
        ...req.body,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "comment was updated successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
