const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { User };
