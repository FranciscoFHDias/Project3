const Location = require('../models/Location')

function indexRoute(req, res, next) {
  Location.find(req.query)
    .select('-comments')
    .then(locations => res.json(locations))
    .catch(next)
}

function createRoute(req, res, next) {
  req.body.user = req.currentUser._id

  const location = new Location(req.body)

  location.save()
    .then(location => res.status(201).json(location))
    .catch(next)
}


function showRoute(req, res, next) {
  Location.findById(req.params.id)
    .populate({ path: 'user', select: '-email' })
    .populate({ path: 'comments.user', select: '-email' })
    .then(location => {
      if(!location) return res.sendStatus(404)

      return res.json(location)
    })
    .catch(next)
}

function updateRoute(req, res, next) {
  Location.findById(req.params.id)
    .then(location => {
      if(!location) return res.sendStatus(404)
      return location.set(req.body)
    })
    .then(location => location.save())
    .then(location => res.json(location))
    .catch(next)
}

function deleteRoute(req, res, next) {
  Location.findById(req.params.id)
    .then(location => {
      if(!location) return res.sendStatus(404)

      return location.remove()
        .then(() => res.sendStatus(204))
    })
    .catch(next)
}

function commentCreateRoute(req, res, next) {

  req.body.user = req.currentUser._id

  Location.findById(req.params.id)
    .then(location => {
      if(!location) return res.sendStatus(404)
      location.comments.push(req.body)
      return location.save()
    })
    .then(location => Location.populate(location, 'user comments.user'))
    .then(location => res.json(location))
    .catch(next)
}

function commentDeleteRoute(req, res, next) {
  Location.findById(req.params.id)
    .then(location => {
      if(!location) return res.sendStatus(404)

      const comment = location.comments.id(req.params.commentId)
      if(!comment) return res.sendStatus(404)

      comment.remove()
      return location.save()
    })
    .then(location => Location.populate(location, 'user comments.user'))
    .then(location => res.json(location))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}
