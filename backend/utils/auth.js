const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_CODE = process.env.JWT_SECRET;

exports.getUserByToken = (token) => {
  return new Promise((res, rej) => {
    if (token) {
      let userDetail;
      try {
        userDetail = jwt.verify(token, SECRET_CODE);
        res(userDetail);
      } catch (error) {
        rej("Please enter a valid token!");
        console.log(error);
      }
    } else {
      rej("Token not found!");
    }
  });
};

exports.authToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: "Failed",
      data: "Unauthorized access",
      message: "Please login to continue.",
    });
  }
  jwt.verify(token, SECRET_CODE, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          status: "Failed",
          data: "Session expired",
          message: "Session Expired. Please login again to continue.",
        });
      } else {
        return res.status(403).json({
          status: "Failed",
          data: "Invalid token",
          message: "Invalid token. Please login again to continue.",
        });
      }
    }
    req.user = user;
    next();
  });
};
