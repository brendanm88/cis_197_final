// middleware to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.username && req.session.username !== '') {
    next()
  } else {
    next('Error: user is not authenticated')
  }
}

module.exports = isAuthenticated
