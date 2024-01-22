const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const { rndmTwoDigNum, rndmFiveDigNum } = require("../utils/unique");
const saltRounds = 10;
const SECRET_KEY = process.env.JWT_SECRET;

exports.postSignUp = async (req, res) => {
  bcrypt.genSalt(saltRounds, (saltError, saltValue) => {
    if (!saltError) {
      bcrypt.hash(
        req.body.password,
        saltValue,
        async (hashError, hashValue) => {
          if (!hashError) {
            try {
              const userId = `${rndmTwoDigNum()}HL${rndmFiveDigNum()}`;
              const user = await User.create({
                userID: userId,
                username: `${req.body.email.split("@")[0]}-${
                  userId.split("HL")[0]
                }${userId.split("HL")[1]}`,
                email: req.body.email,
                password: hashValue,
              });
              res.status(200).json({
                status: "Success",
                user,
              });
            } catch (err) {
              res.status(400).json({
                status: "Failed",
                message: "User already exists. Please login to continue.",
              });
            }
          } else {
            res.status(400).json({
              status: "Failed",
              message: "Failed to store the data",
            });
          }
        }
      );
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Failed store the data",
      });
    }
  });
};

exports.postSignIn = async (req, res) => {
  try {
    const userDetail = await User.findOne({ email: req.body.email });
    if (!userDetail) {
      res.status(400).json({
        status: "Failed",
        message: "User does not exist. Please sign up.",
      });
    } else {
      if (bcrypt.compareSync(req.body.password, userDetail.password)) {
        const token = jwt.sign(
          {
            id: userDetail._id,
            userID: userDetail.userID,
            username: userDetail.username,
          },
          SECRET_KEY
        );
        res.status(200).json({
          status: "Success",
          message: "User logged in successfully.",
          token,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message:
            "Invalid Password! Please enter a correct password to login!",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.uploadProfileImage = (req, res) => {
  try {
    const { filename } = req.file;
    res.status(200).send({
      status: "Success",
      message: "User profile image uploaded successfully",
      filename,
    });
  } catch (err) {
    res.status(500).send({ status: "Failed", message: err.message });
  }
};
