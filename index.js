const express = require('express')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'), {
  message: 'Please choose another {PATH}'
})
const bodyParser = require('body-parser')
const errorHandler = require('./lib/errorHandler')
const router = require('./config/routes')

const { port, dbURI } = require('./config/environment')

const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true })

// look for static files in the `dist folder`
// static files are files like index.html, images, fonts, styles etc ...
app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json())

app.use('/api', router)

app.use(errorHandler)

app.listen(port, () => console.log(`Here we go, date number ${port}!!!`))

module.exports = app
