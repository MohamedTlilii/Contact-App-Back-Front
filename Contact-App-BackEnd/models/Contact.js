const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    contactName: {
      type: String,
      required: [true, "Username is required field"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "This is invalid email",
      ],
    },
    imageUrl: {
      type: [String],
      default: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Contact = mongoose.model("contacts", contactSchema);
