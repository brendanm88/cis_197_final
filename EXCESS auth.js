const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/error', (req, res) => res.send('Unknown Error'))
router.get('/auth/twitter', passport.authenticate('twitter'))
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/auth/error' }),
  (req, res) => {
    res.redirect('/')
  })

// router.get('/login', (req, res, next) => {
//   res.render('login')
// })

// router.get('/login/federated/twitter.com', passport.authenticate('twitter'))

// router.get('/oauth/callback/twitter.com',
//   passport.authenticate('twitter', { assignProperty: 'federatedUser', failureRedirect: '/login' }),
//   (req, res, next) => {
//     db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
//       'https://twitter.com',
//       req.federatedUser.id,
//     ], (err, row) => {
//       if (err) {
//         return next(err)
//       }
//       if (!row) {
//         db.run('INSERT INTO users (name) VALUES (?)', [
//           req.federatedUser.displayName,
//         ], err => {
//           if (err) {
//             return next(err)
//           }

//           const id = this.lastID
//           db.run('INSERT INTO federated_credentials (provider, subject, user_id) VALUES (?, ?, ?)', [
//             'https://twitter.com',
//             req.federatedUser.id,
//             id,
//           ], err => {
//             if (err) {
//               return next(err)
//             }
//             const user = {
//               id: id.toString(),
//               displayName: req.federatedUser.displayName,
//             }
//             req.login(user, err => {
//               if (err) {
//                 return next(err)
//               }
//               res.redirect('/')
//             })
//           })
//         })
//       } else {
//         db.get('SELECT rowid AS id, username, name FROM users WHERE rowid = ?', [row.user_id], (err, row) => {
//           if (err) {
//             return next(err)
//           }

//           const user = {
//             id: row.id.toString(),
//             username: row.username,
//             displayName: row.name,
//           }
//           req.login(user, err => {
//             if (err) {
//               return next(err)
//             }
//             res.redirect('/')
//           })
//         })
//       }
//     })
//   })

// router.get('/logout', (req, res, next) => {
//   req.logout()
//   res.redirect('/')
// })

module.exports = router
