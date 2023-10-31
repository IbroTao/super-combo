const { connect } = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGO_URL;

const mongoConnect = () => {
  return connect(mongoURL);
};

module.exports = { mongoConnect };
