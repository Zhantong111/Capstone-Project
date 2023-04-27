const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://zhantongper:Zhantong3009@cluster0.vnvxojd.mongodb.net/mern-hotel";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});

module.exports = mongoose;
