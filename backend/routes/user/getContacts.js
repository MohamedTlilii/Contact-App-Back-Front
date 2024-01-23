const Contact = require("../../models/Contact");
module.exports = async (req, res) => {
  try {
    let { id } = req.user;
    let contacts = await Contact.find({ userId: id });
    res.status(200).json({ status: true, data: contacts });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
