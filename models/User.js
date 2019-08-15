const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}, {
  toJSON: {
    transform(doc, json) {
      delete json.password
      delete json.__v
      return json
    }
  }
})

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(plaintext) {
    this._passwordConfirmation = plaintext
  })

userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }

  next()
})

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }

  next()
})

userSchema.methods.validatePassword = function validatePassword(plaintext) {
  return bcrypt.compareSync(plaintext, this.password)
}

module.exports = mongoose.model('User', userSchema)
