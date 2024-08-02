// config/mongoose-connection.js

const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");
const URL = process.env.MONGODB_URI
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    dbgr("connected");
  })
  .catch((err) => {
    dbgr(err);
  });

module.exports = mongoose.connection;
