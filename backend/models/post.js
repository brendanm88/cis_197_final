const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  postTitle: { type: String, required: true },
  postText: String,
  author: { type: String, required: true },
  imageURL: String,
  comments: [{ author: String, comment: String }],
  type: { type: String },
})

module.exports = model('Post', postSchema)
