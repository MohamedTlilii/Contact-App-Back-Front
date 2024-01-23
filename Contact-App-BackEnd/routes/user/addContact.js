const Contact = require("../../models/Contact");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    let { contactName, phone, email, address } = req.body;
    let { id } = req.user;
    const uploader = async (path) => await cloudinary.uploads(path, "uploads");

    let urls = [];
    for (let i = 0; i < req.files.length; i++) {
      let result = await uploader(req.files[i].path);
      urls.push(result.url);
      fs.unlinkSync(req.files[i].path);
    }
    // let { path } = file;
    // const { url } = uploader(path);
    // fs.unlinkSync(path);

    // let imageUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;

    let newContact = await new Contact({
      contactName,
      phone,
      email,
      address,
      userId: id,
      imageUrl: urls,
    });
    console.log(newContact);
    await newContact.save();
    res
      .status(200)
      .json({ status: true, message: "Contact created successfully" });
  } catch (error) {
    res.status(401).json({ status: false, error });
  }
};
