const { hashSync, compareSync, hash } = require("bcryptjs");
const { User } = require("../models/users.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

//USER TO SIGN UP(REGISTER AND CREATE NEW USER)
const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json("Email already used");
    await User.create({
      username,
      email,
      password: hashSync(password, 11),
    });
    res.status(201).json("User signed up successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

//USER TO SIGN IN(LOGIN)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Incorrect email");

    const verifyPassword = compareSync(password, user.password);
    if (!verifyPassword) return res.status(400).json("Wrong password");

    const jwtToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      SECRET,
      { expiresIn: "3d" }
    );

    const confirmUser = await User.findById(user._id).select(["-password"]);
    res.status(200).json({
      user: confirmUser,
      token: jwtToken,
      msg: "User signed in successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

//UPDATE USER
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $all: req.body,
      },
      {
        new: true,
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

//CHANGE USER PASSWORD
const changeUserPassword = async (req, res) => {
  try {
    const reqInfo = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
      userAccess: req.params.id,
    };

    let user = await User.findById(reqInfo.userAccess);
    if (!user) {
      res.status(404).json("User not found!");
    } else {
      const confirmPassword = compareSync(reqInfo.oldPassword, user.password);
      if (!confirmPassword) {
        res.status(403).json("Password does not match!");
      } else {
        user = await user.save();
        res.status(200).json("User password changed and updated!");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// CHANGE USER EMAIL
const changeEmail = async (req, res) => {
  try {
    const data = {
      password: req.body.password,
      email: req.body.email,
      userAccess: req.params.id,
    };

    let user = await User.findById(userAccess);
    if (!user) {
      res.status(404).json("User not found!");
    } else {
      const confirmPassword = compareSync(data.password, user.password);
      if (!confirmPassword) {
        res.status(400).json("Wrong password!");
      } else {
        user.email = data.email;
        user = await user.save();
        res.status(200).json("Email changed and updated");
      }
    }
  } catch (err) {
    res.status(500).json(e);
  }
};

module.exports = {
  signupUser,
  loginUser,
  updateUser,
  changeUserPassword,
  changeEmail,
};
