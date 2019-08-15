const router = require('express').Router()
const locationsController = require('../controllers/locations')
const authController = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

router.route('/locations')
  .get(locationsController.index)
  .post(secureRoute, locationsController.create)

router.route('/locations/:id')
  .get(locationsController.show)
  .put(secureRoute, locationsController.update)
  .delete(secureRoute, locationsController.delete)

router.post('/locations/:id/comments', secureRoute, locationsController.commentCreate)
router.delete('/locations/:id/comments/:commentId', secureRoute, locationsController.commentDelete)

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
