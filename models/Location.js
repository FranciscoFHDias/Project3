const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 380 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
},{
  timestamps: true
})


const locationSchema = new mongoose.Schema({
  name: { type: String, required: 'please provide a {PATH}', unique: true },
  address: { type: String, required: 'please provide a {PATH}' },
  cost: { type: Number, required: 'please provide a {PATH}', min: 1, max: 5  },
  actType: { type: [ String ], required: 'please provide a {PATH}' },
  dateNum: { type: [ Number ], required: 'please provide a {PATH}', min: 1, max: 5},
  image: { type: String },
  contactNumber: { type: Number },
  link: { type: String },
  comments: [ commentSchema ],
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  toJSON: { virtuals: true }
})

locationSchema.virtual('averageRating')
  .get(function getAverageRating() {
    if(this.comments.length === 0) return 0
    return this.comments.reduce((total, comment) => comment.rating + total, 0) / this.comments.length
  })

module.exports = mongoose.model('Location', locationSchema)
