const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin");
const {
  createPost,
  deletePost,
  updatePost,
  getPosts,
} = require("../controllers/post.controllers");

router.post("/post/create", isLoggedIn, createPost);
router.put("/post/update/:id", isLoggedIn, updatePost);
router.delete("/post/delete/:id", isLoggedIn, deletePost);
router.get("/post/get", isLoggedIn, getPosts);

module.exports = router;
