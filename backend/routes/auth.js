const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/error' }),
  (req, res) => {
    const username = req.session.passport.user._json.email
    req.session.username = username
    res.redirect('/')
  })

router.get('/error', (req, res) => res.send('Unknown Error'))
router.post('/', (req, res) => {
  res.send('Success')
})

module.exports = router
