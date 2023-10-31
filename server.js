const express = require("express");
const server = express();
const cors = require("cors");
const { mongoConnect } = require("./configs/mongo.configs");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/posts.routes");

const corsOptions = {
  origin: "*",
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/api/auth", authRouter);
server.use("/api/post", postRouter);

require("dotenv").config();
const port = process.env.PORT;

const runServer = (port) => {
  mongoConnect()
    .then((res) => {
      server.listen(port);
      console.log(`Server is running on PORT ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
runServer(port);
