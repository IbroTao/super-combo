const mongoose = require("mongoose");

const Post = mongoose.model(
  "posts",
  new mongoose.Schema(
    {
      subject: {
        type: String,
        required: true,
      },
      school: {
        type: String,
        required: true,
      },
      school: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      userid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { Post };
