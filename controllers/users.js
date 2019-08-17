const User = require('../models/User')

function userDetailsRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if(!user) return res.sendStatus(404)
      return user.set(req.body)
    })
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next)
}

function userShowRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      if(!user) return res.sendStatus(404)
      return res.json(user)
    })
    .catch(next)
}

function usersIndexRoute(req, res, next) {
  User.find(req.query)
    .select('username')
    .then(users => res.json(users))
    .catch(next)
}

module.exports = {
  userUpdate: userDetailsRoute,
  userShow: userShowRoute,
  usersIndex: usersIndexRoute
}
