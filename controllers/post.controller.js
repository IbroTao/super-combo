const { Post } = require("../models/posts.model");

const createPost = async (req, res) => {
  try {
    const { file, body } = req;
    const post = await Post.create({
      img: `assets/images/${file.originalname}`,
      subject: req.body.subject,
      teacher: req.body.teacher,
      school: req.body.school,
      userid: req.user.id,
    });
    res.status(201).json("Post created and updated");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { createPost };
