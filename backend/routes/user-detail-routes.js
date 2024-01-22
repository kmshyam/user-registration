const express = require("express");
const router = express.Router();
const {
  postUserRegistrationData,
  getAllRegisteredUsersData,
  deleteUserData,
} = require("../controllers/userDetailController");
const { authToken } = require("../utils/auth");

router.post("/form/register", authToken, postUserRegistrationData);

router.get("/all", authToken, getAllRegisteredUsersData);

router.delete("/delete/:id", authToken, deleteUserData);

module.exports = router;
