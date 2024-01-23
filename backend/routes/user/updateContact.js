const Contact = require("../../models/Contact");
module.exports = async (req, res) => {
  try {
    let { contactId } = req.params;
    
    await Contact.findByIdAndUpdate(contactId, {
      $set: {
        ...req.body,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "contact was updated successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
