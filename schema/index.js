var mongoose = require("../mongo"),
  Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  password: String
});

module.exports = mongoose.model("user", User);
