const mongoose = require("mongoose");

const getConnection = async () => {
  await mongoose.connect(
    "mongodb+srv://kmshyam:shyamsrinivasan@cluster.e9fgngm.mongodb.net/users-registration?retryWrites=true&w=majority"
  );
  console.log("Connected to database successfully.");
};

module.exports = getConnection;
