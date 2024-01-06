const User = require("../../models/User");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: false,
        error: "Wrong Email or Password ",
      });
    }
    const testPassword = await bcrypt.compare(password, user.password);
    if (!testPassword) {
      return res.status(401).json({
        status: false,
        error: "Wrong Email or Password ",
      });
    }

    res.json({ message: "ok" });
  } catch (error) {
    if (errot) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
