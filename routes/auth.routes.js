const {
  signupUser,
  loginUser,
  changeUserPassword,
} = require("../controllers/auth.controller");
const { verifyAndAuthorizeUser } = require("../middlewares/verify");

const router = require("express").Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/change/password/:id", changeUserPassword);

module.exports = router;
