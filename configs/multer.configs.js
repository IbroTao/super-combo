const multer = require("multer");
let prefix = Math.floor(Math.random() * 70).toFixed(4);

const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./assets");
  },
  filename: (req, res, cb) => {
    cb(null, `pics-${prefix}-${file.originalname}`);
  },
});

const fileFilter = (req, res, cb) => {
  if (
    file.mimetype === "images/png" ||
    file.mimetype === "images/jpg" ||
    file.mimetype === "images/jpeg" ||
    file.mimetype === "images/srt" ||
    file.mimetype === "images/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = { fileStorage, fileFilter };
