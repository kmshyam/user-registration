const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getUnixTime } = require("./unique");

const userProfileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { userId } = req.params;
    const profileImagePath = path.join("public", "users", userId, "profile");

    if (!fs.existsSync(profileImagePath)) {
      fs.mkdirSync(profileImagePath, { recursive: true });
    }

    fs.readdirSync(profileImagePath).forEach((existingFile) => {
      const filePath = path.join(profileImagePath, existingFile);
      if (
        file.originalname.endsWith(".png") ||
        file.originalname.endsWith(".jpg") ||
        file.originalname.endsWith(".jpeg") ||
        file.originalname.endsWith(".webp")
      ) {
        if (
          existingFile.endsWith(".png") ||
          existingFile.endsWith(".jpg") ||
          existingFile.endsWith(".jpeg") ||
          existingFile.endsWith(".webp")
        ) {
          fs.unlinkSync(filePath);
        }
      }
    });

    cb(null, profileImagePath);
  },
  filename: (req, file, cb) => {
    const originalFilename = file.originalname;
    const fieldName = file.fieldname;
    const filename = `${fieldName}_profile_${Date.now()}_${originalFilename
      .split(" ")
      .join("_")}`;
    cb(null, filename);
  },
});

const uploadUserProfileImage = multer({ storage: userProfileImageStorage });

const userDocumentsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { userID } = req.params;
    const documentPath = path.join("public", "users", userID, "documents");

    if (!fs.existsSync(documentPath)) {
      fs.mkdirSync(documentPath, { recursive: true });
    }
    cb(null, documentPath);
  },
  filename: (req, file, cb) => {
    const originalFilename = file.originalname;
    const fieldName = file.fieldname;
    const filename = `${fieldName}_document_${getUnixTime()}_${originalFilename
      .split(" ")
      .join("_")}`;
    cb(null, filename);
  },
});

const uploadUserDocuments = multer({ storage: userDocumentsStorage });

module.exports = {
  uploadUserProfileImage,
  uploadUserDocuments,
};
