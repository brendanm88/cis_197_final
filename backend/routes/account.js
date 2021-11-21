const express = require('express')

const isAuthenticated = require('../middlewares/isAuthenticated')

const User = require('../models/user')
const Post = require('../models/post')

const router = express.Router()

// is logged in? middleware to check
router.post('/isLoggedIn', isAuthenticated, (req, res) => {
  const { username } = req.session
  res.send(username)
})

// create user
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  // case for if username already exists throw error? *********************************
  try {
    await User.create({ username, password })
    res.send('user created')
  } catch (err) {
    next(err)
  }
})

// create or update description and image for individual user
router.post('/describe', isAuthenticated, async (req, res, next) => {
  const { username } = req.session
  const { desc, image } = req.body
  try {
    await User.updateOne({ username }, { desc, image })
    res.send('user description updated')
  } catch (err) {
    next(err)
  }
})

// get all posts of current user
router.get('/posts', async (req, res) => {
  const { username } = req.body
  try {
    const posts = await Post.find({ author: username })
    res.json(posts)
  } catch (err) {
    res.send('getting posts of user has problems')
  }
})

// login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.send('user does not exist')
    } else {
      const { password: passDB } = user
      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user logged in successfully')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    next(err)
  }
})

// logout
router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user is logged out')
})

// add or update type of user
router.post('/type', isAuthenticated, async (req, res, next) => {
  const { type } = req.body
  const { username } = req.session
  try {
    await User.updateOne({ username }, { type })
    res.send('user type updated')
  } catch (err) {
    next(err)
  }
})

// add friend to user
router.post('/friend', isAuthenticated, async (req, res, next) => {
  const { friendUser } = req.body
  const { username } = req.session

  try {
    const friend = await User.findOne({ username: friendUser })
    if (!friend) {
      res.send('friend does not exist')
    } else {
      try {
        await User.updateOne({ username }, { $addToSet: { friends: friendUser } })
        res.send('friend added successfully')
      } catch (err) {
        next(err)
      }
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
