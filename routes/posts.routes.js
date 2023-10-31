const multer = require("multer");
const { createPost } = require("../controllers/post.controller");
const { fileFilter, fileStorage } = require("../configs/multer.configs");

const router = require("express").Router();

router.post("/create", multer({ fileStorage, fileFilter }), createPost);

module.exports = router;
