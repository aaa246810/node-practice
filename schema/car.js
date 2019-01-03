var mongoose = require("../mongo"),
  Schema = mongoose.Schema;

const Car = new Schema({
  orderNum: String,
  date: String,
  make: String,
  filme: String,
  version: String,
  createDate: String,
  mille: Number,
  suggestPrice1: Number,
  suggestPrice2: Number,
  level: String,
  des: String,
  business: Schema.Types.ObjectId
});

module.exports = mongoose.model("car", Car);
