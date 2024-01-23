const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  let SECRET_KEY = process.env.SECRET_KEY;
  let { token } = req.headers;
  if (!token) {
    return res.status(400).json({ status: false, error: "Invalid token" });
  }
  let verifiedToken = await jwt.verify(token, SECRET_KEY);

  if (!verifiedToken) {
    return res.status(400).json({ status: false, error: "Expired session" });
  } else {
    req.user = { id: verifiedToken.id };
    return next();
  }
};
