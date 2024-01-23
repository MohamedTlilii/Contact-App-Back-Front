const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res) => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, error: "Wrong email or password" });
    }
    const testPassword = await bcrypt.compare(password, user.password);
    if (!testPassword) {
      return res
        .status(401)
        .json({ status: false, error: "Wrong email or password" });
    }
    let token = await jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({
      status: true,
      data: {
        token,
        id: user._id,
        isUser: user.isUser,
        isBanned: user.isBanned,
      },
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
