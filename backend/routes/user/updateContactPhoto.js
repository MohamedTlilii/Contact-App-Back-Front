const Contact = require("../../models/Contact");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    // let imageUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
    const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    let { path } = req.file;
    const { url } = await uploader(path);
    fs.unlinkSync(path);

    await Contact.findByIdAndUpdate(id, {
      $set: {
        imageUrl: url,
      },
    });
    res.status(200).json({
      status: true,
      message: "Contact photo was updated successfully",
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
