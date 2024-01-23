const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    let { id } = req.user;
    let imageUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;

    await User.findByIdAndUpdate(id, {
      $set: {
        imageUrl,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "User photo was updated successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
