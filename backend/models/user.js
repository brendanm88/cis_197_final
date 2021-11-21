const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: String }],
  friends: [{ type: String }],
  type: String,
  desc: String,
  image: String,
})

module.exports = model('User', userSchema)
