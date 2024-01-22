const express = require("express");
const router = express.Router();
const {
  postSignUp,
  postSignIn,
  uploadProfileImage,
} = require("../controllers/userController");
const { uploadUserProfileImage } = require("../utils/multer");
const { authToken } = require("../utils/auth");

router.post("/signup", postSignUp);

router.post("/signin", postSignIn);

router.post(
  "/profile/upload/:userId",
  authToken,
  uploadUserProfileImage.single("file"),
  uploadProfileImage
);

module.exports = router;
