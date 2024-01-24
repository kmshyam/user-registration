const express = require("express");
const router = express.Router();
const {
  uploadUserFiles,
  postUserRegistrationData,
  getAllRegisteredUsersData,
  editUserRegistrationData,
  deleteUserData,
  downloadUserDocument,
  deleteUserDocument,
  deleteAllUserDocuments,
} = require("../controllers/userDetailController");
const { authToken } = require("../utils/auth");
const { uploadUserDocuments } = require("../utils/multer");

router.post(
  "/upload/files/:userID",
  authToken,
  uploadUserDocuments.single("file"),
  uploadUserFiles
);

router.post("/form/register", authToken, postUserRegistrationData);

router.get("/all", authToken, getAllRegisteredUsersData);

router.put("/form/register/edit", authToken, editUserRegistrationData);

router.delete("/delete/:id", authToken, deleteUserData);

router.get("/document/download", downloadUserDocument);

router.put("/document/delete", authToken, deleteUserDocument);

router.put("/documents/delete/all", authToken, deleteAllUserDocuments);

module.exports = router;
