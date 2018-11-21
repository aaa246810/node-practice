var mongoose = require('../mongo'),
    Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    password: String,
    age: Number,
    loginDate: Date
})

module.exports = mongoose.model('user', User)