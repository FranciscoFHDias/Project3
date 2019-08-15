const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const router = require('./config/routes')
const { dbURI } = require('./config/environment')

const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true })

app.use(bodyParser.json())

app.use('/api', router)

app.listen(4000, () => console.log('Here we go, date number 4000!!!'))

module.exports = app
