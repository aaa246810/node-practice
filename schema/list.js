var mongoose = require("../mongo"),
  Schema = mongoose.Schema;

const List = new Schema({
  name: String,
  date: Number,
  tel: Number,
  address: String
});

module.exports = mongoose.model("list", List);
