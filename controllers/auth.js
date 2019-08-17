const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function registerRoute(req, res, next) {
  User.create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next)
}

function userIndexRoute(req, res, next) {
  User.find(req.query)
    .select('username')
    .then(users => res.json(users))
    .catch(next)
}

function loginRoute(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.sendStatus(401)
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '167h' })
      res.json({ message: `Welcome back ${user.username}!`, token })
    })
    .catch(next)
}

module.exports = {
  register: registerRoute,
  showUsers: userIndexRoute,
  login: loginRoute
}
