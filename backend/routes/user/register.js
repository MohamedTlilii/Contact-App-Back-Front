const User = require("../../models/User");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    let { userName, email, password } = req.body;
    let existedUser = await User.findOne({ email });
    let existedUsername = await User.findOne({ userName });
    if (existedUser) {
      return res.status(401).json({
        status: true,
        message: "This email is already existed,please try another one",
      });
    }
    if (existedUsername) {
      return res.status(401).json({
        status: true,
        message: "This username is already used,please try another one",
      });
    }
    if (!password) {
      return res.status(401).json({
        status: false,
        error: "Password is required",
      });
    }
    let validatePassword = password.match(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*@-_).{8,}$/
    );
    if (!validatePassword) {
      return res.status(401).json({
        status: false,
        error:
          "Password must contain least a minimum length of 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character:",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ status: true, message: "User was created successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error: error.errors });
  }
};
