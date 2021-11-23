const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('./models/user')

const { API_KEY, SECRET_KEY } = require('../config')

const auth = () => {
  passport.serializeUser((user, cb) => {
    cb(null, user)
  })
  passport.deserializeUser((user, cb) => {
    cb(null, user)
  })
  passport.use(new GoogleStrategy({
    clientID: API_KEY,
    clientSecret: SECRET_KEY,
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    const { email } = profile._json
    const username = email
    const password = 'google'
    try {
      const user = await User.findOneAndUpdate({ username }, { $set: { password } }, { upsert: true })
    } catch (err) {
      cb(err) // *********************************
    }
    cb(null, profile)
  }))
}

module.exports = auth
