const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  const header = req.headers.token;
  if (header) {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        res.status(403).json("Invalid token");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

const verifyAndAuthorizeUser = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are not authorized!");
    }
  });
};

const verifyAndAuthorizeAdmin = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorize to do this");
    }
  });
};

module.exports = {
  verifyUser,
  verifyAndAuthorizeUser,
  verifyAndAuthorizeAdmin,
};
