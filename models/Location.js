const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 380 },
  rating: { type: Number, required: true, min: 1, max: 5},
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
},{
  timestamps: true
})

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  cost: { type: Number, required: true, min: 1, max: 5 },
  actType: { type: [ String ], required: true },
  dateNum: { type: [ Number ], required: true, min: 1, max: 5},
  image: {type: String },
  contactNumber: { type: Number },
  link: { type: String },
  comments: [ commentSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Location', locationSchema)
