const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const connection = require("./connection/connection");
const userRoutes = require("./routes/user-routes");
const userDetailRoutes = require("./routes/user-detail-routes");

const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

connection()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
  })
  .catch(() => {
    console.log("Failed to connect to database!");
  });

app.use("/user", cors(), userRoutes);
app.use("/user/detail", cors(), userDetailRoutes);
