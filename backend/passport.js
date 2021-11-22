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
    consumerKey: '',
    consumerSecret: '',
    callbackURL: 'http://localhost:3000/auth/twitter/callback',
  },
  ((accessToken, refreshToken, profile, done) => done(null, profile))))
}

module.exports = auth
