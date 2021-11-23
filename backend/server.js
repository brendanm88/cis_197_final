const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const path = require('path')
const passport = require('passport')

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')
// const AuthRouter = require('./routes/auth')
const isAuthenticated = require('./middlewares/isAuthenticated')
const User = require('./models/user')

require('./passport')(passport)

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/197-final'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))

// handling POST --> req.body
app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 26 * 60 * 60 * 1000,
  // 24 hours
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  // just use req.session and get email for new user
  res.send(req.session.username)
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error' }),
  async (req, res, next) => {
    const username = req.session.passport.user._json.email
    const password = 'google'
    req.session.username = username
    req.session.password = password
    res.redirect('/')
  })

// logout google
app.get('/auth/logout', (req, res) => {
  req.session = null
  req.logout()
  res.redirect('/')
})

app.get('/error', (req, res) => res.send('Unknown Error'))
app.post('/', (req, res) => {
  res.send('Success')
})

// routers
app.use('/account', AccountRouter)
app.use('/api', ApiRouter)
// app.use('/auth', AuthRouter)

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// // set the initial entry point
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'))
// })

// error handling default/middleware
app.use(isAuthenticated, (err, req, res, next) => {
  if (err.message) {
    res.status(200).send(err.message)
  } else {
    res.status(200).send(err)
  }
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
