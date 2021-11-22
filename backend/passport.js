const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

const auth = () => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  passport.use(new TwitterStrategy({
    consumerKey: 'AChzVNE3NlCR3NU2fNVNtrZC1',
    consumerSecret: 'uiOwJd8wRZGBfgVu3M6X8kHqnj8UuYxaPI6tASVCeN4vBw0RBu',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
  },
  ((accessToken, refreshToken, profile, done) => done(null, profile))))
}

module.exports = auth
