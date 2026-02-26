const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    role: String,
    email: String,
    contact: Number
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel