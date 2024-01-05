const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required filed"],
    },

    password: {
      type: String,
    },
    email: {
      type: String,
      // required: [true, "Email is required filed"],
      // Math: [
      //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      //   "This is invalid email",
      // ],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = User = mongoose.model("users", userSchema);
