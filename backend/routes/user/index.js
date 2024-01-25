const express = require("express");
const route = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/multer");
// register
route.post("/register", require("./register"));
// login
route.post("/login", require("./login"));

// add contact
route.post(
  "/addContact",
  verifyToken,
  upload.array("photo", 4),
  require("./addContact")
);
// get contacts
route.get("/contacts", verifyToken, require("./getContacts"));

// update contact
route.put("/updateContact/:contactId", verifyToken, require("./updateContact"));

//update  contact photo
route.put(
  "/updateContactPhoto/:id",
  verifyToken,
  upload.single("photo"),
  require("./updateContactPhoto")
);
// delete contact
route.delete(
  "/deleteContact/:contactId",
  verifyToken,
  require("./deleteContact")
);
// delete account
route.delete("/deleteAccount", verifyToken, require("./deleteAccount"));

// update user photo
route.put(
  "/updatePhoto",
  verifyToken,
  upload.single("photo"),
  require("./updatePhoto")
);

// get posts
route.get("/posts", verifyToken, require("./getPosts"));

// add comment
route.post("/addComment/:postId", verifyToken, require("./addComment"));

// update comment
route.put("/update/:commentId", verifyToken, require("./updateComment"));

// get comments
route.get("/getComments/:postId", verifyToken, require("./getComments"));

// delete comment
route.delete(
  "/deleteComment/:commentId",
  verifyToken,
  require("./deleteComment")
);
module.exports = route;
