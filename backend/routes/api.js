const express = require('express')

const router = express.Router()

const Post = require('../models/post')
const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

// add post
router.post('/posts/add', isAuthenticated, async (req, res, next) => {
  const { postTitle, postText, imageURL } = req.body
  const { username } = req.session
  const { type: typeDB } = await User.findOne({ username })
  try {
    await Post.create({
      postTitle,
      postText,
      author: username,
      type: typeDB,
      imageURL,
    })
    await User.updateOne({ username }, { $addToSet: { posts: postTitle } })
    res.send('post created')
  } catch (err) {
    next(err)
  }
})

// add comment to post
router.post('/posts/comment', isAuthenticated, async (req, res, next) => {
  const { id, comment } = req.body
  const { username } = req.session
  if (!comment || comment === '') {
    res.send('empty comment! add some text')
  } else {
    try {
      await Post.updateOne({ _id: id.id }, { $push: { comments: { author: username, comment } } })
      res.send('post comments updated')
    } catch (err) {
      next(err)
    }
  }
})

// get all posts of certain type or just all
router.get('/posts', async (req, res) => {
  const { type } = req.query
  try {
    if (!req.query.type) {
      const posts = await Post.find({})
      res.json(posts)
    } else {
      const posts = await Post.find({ type })
      res.json(posts)
    }
  } catch (err) {
    res.send('getting posts has problems')
  }
})

// get all posts from user's friends
// router.post('/posts/friends', async (req, res) => {
//   const { friends } = req.body
//   try {
//     const posts = await Post.find({ author: { $in: friends } })
//     res.send(posts)
//   } catch (err) {
//     res.send('getting friend posts has problems')
//   }
// })

// get types of posts
router.get('/postTypes', async (req, res) => {
  try {
    const dict = await Post.find({}, { type: 1, _id: 0 })
    const types = dict.map(({ type }) => type)
    const uniqueTypes = [...new Set(types.filter(Boolean))]
    const capital = uniqueTypes.map(e => e[0].toUpperCase() + e.substring(1))
    const friends = 'Friends'
    const second = [friends].concat(capital)
    const all = 'All'
    const final = [all].concat(second)
    res.send(final)
  } catch (err) {
    res.send('getting posts has problems')
  }
})

// get all users of certain type or just all
router.get('/users', async (req, res) => {
  const { type } = req.query
  try {
    if (!req.query.type) {
      const users = await User.find({})
      res.json(users)
    } else {
      const users = await User.find({ type })
      res.json(users)
    }
  } catch (err) {
    res.send('getting users has problems')
  }
})

module.exports = router
