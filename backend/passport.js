const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const { API_KEY, SECRET_KEY } = require('../config')

const auth = () => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  passport.use(new TwitterStrategy({
    consumerKey: API_KEY,
    consumerSecret: SECRET_KEY,
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
  },
  ((accessToken, refreshToken, profile, done) => done(null, profile))))
}

module.exports = auth
