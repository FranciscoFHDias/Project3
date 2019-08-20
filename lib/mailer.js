const { USER, PASS } = require('../config/environment')
const nodemailer = require('nodemailer')

const transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: USER,
    pass: PASS
  }
}
//something wrong on this branch
const transporter = nodemailer.createTransport(transport)

module.exports = transporter
