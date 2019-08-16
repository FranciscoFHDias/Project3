const mongoose = require('mongoose')


const locationSchema = new mongoose.Schema({
  q1: { type: String, required: true},
  q2: { type: String, required: true},
  q3: { type: String, required: true},
  q4: { type: String, required: true},
  q5: { type: String, required: true}
})

module.exports = mongoose.model('Location', locationSchema)
