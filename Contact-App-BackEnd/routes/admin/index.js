const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/verifyToken");
const multer = require("../../middlewares/multer");
// register : /api/admin/register
// router.post("/register", require("./register"));

// login : /api/admin/login
router.post("/login", require("./login"));

// get users : /api/admin/getUsers
router.get("/getUsers", verifyToken, require("./getUsers"));

//ban user : /api/admin/banUser
router.put("/banUser/:userId", verifyToken, require("./banUser"));

//unban user : /api/admin/unbanUser
router.put("/unbanUser/:userId", verifyToken, require("./unbanUser"));

//add post : /api/admin/addPost
router.post(
  "/addPost",
  verifyToken,
  multer.single("postPic"),
  require("./addPost")
);

// get posts : /api/admin/getPosts
router.get("/posts", verifyToken, require("./getPosts"));

// get comments : /api/admin/comments
router.get("/comments/:postId", verifyToken, require("./getComments"));

// delete comment : /api/admin/deleteComment
router.delete("/deleteComment/:commentId", verifyToken, require("./deleteComment"));

module.exports = router;
