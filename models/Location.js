const mongoose = require('mongoose')
const axios = require('axios')


const notEmptyRan = []
const notEmptyMsg = 'Please add at least one option'


var notEmpty = function (dateNum) {
  if (dateNum.length === 0) {
    notEmptyRan.push(false)
    return false
  } else {
    notEmptyRan.push(true); return true
  }
}

var notEmptyActType = function (actType) {
  if (actType.length === 0) {
    notEmptyRan.push(false)
    return false
  } else {
    notEmptyRan.push(true); return true
  }
}

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 380 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
},{
  timestamps: true
})
const locationSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a Name!', unique: true },
  addressLine1: { type: String, required: 'Please provide a Address Line 1!' },
  addressLine2: { type: String },
  addressCity: { type: String, required: 'Please provide a City!' },
  addressPostCode: { type: String, required: 'Please provide a Post Code!' },
  latitude: { type: Number, required: 'Please provide a {PATH}' },
  longitude: { type: Number, required: 'Please provide a {PATH}' },
  cost: { type: Number, required: 'Please provide a Cost!', min: 1, max: 5  },
  actType: { type: [ String ], required: 'Please provide a Activity Type!', validate: [notEmpty, notEmptyMsg] },
  dateNum: { type: [ Number ], required: 'Please provide a Date Number!', min: 1, max: 5,  validate: [notEmptyActType, notEmptyMsg] },
  desc: { type: String, required: 'Please provide a Description!', maxlength: 480 } ,
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
