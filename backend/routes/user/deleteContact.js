const Contact = require("../../models/Contact");
module.exports = async (req, res) => {
  try {
    let { contactId } = req.params;
    await Contact.findByIdAndDelete(contactId);
    res
      .status(200)
      .json({ status: true, message: "contact was deleted successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
