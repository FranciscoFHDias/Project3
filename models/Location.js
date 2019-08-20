const mongoose = require('mongoose')
const axios = require('axios')

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 380 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
},{
  timestamps: true
})
const locationSchema = new mongoose.Schema({
  name: { type: String, required: 'please provide a {PATH}', unique: true },
  addressLine1: { type: String, required: 'please provide a {PATH}' },
  addressLine2: { type: String },
  addressCity: { type: String, required: 'please provide a {PATH}' },
  addressPostCode: { type: String, required: 'please provide a {PATH}' },
  latitude: { type: Number, required: 'please provide a {PATH}' },
  longitude: { type: Number, required: 'please provide a {PATH}' },
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



locationSchema.pre('validate', function getGeolocation(done) {
  if(!this.isModified('addressPostCode')) return done()
  axios.post('https://postcodes.io/postcodes?filter=longitude,latitude', { postcodes: [this.addressPostCode] })
    .then(res => {

      if(!res.data.result[0].result) return done()

      const { latitude, longitude } = res.data.result[0].result
      this.latitude = latitude
      this.longitude = longitude

      done()
    })
})

module.exports = mongoose.model('Location', locationSchema)
