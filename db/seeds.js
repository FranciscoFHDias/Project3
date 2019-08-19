const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Location = require('../models/Location')
const User = require('../models/User')
const locationData = require('./data/locationData')
const userData = require('./data/userData')
const { dbURI } = require('../config/environment')

mongoose.connect(dbURI, { useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => Location.create(locationData))
  .then(() => User.create(userData))
  .then(() => console.log('Successfully seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())