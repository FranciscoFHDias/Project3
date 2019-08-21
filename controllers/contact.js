const mailer = require('../lib/mailer')
const { USER } = require('../config/environment')

function emailRoute(req, res, next){
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message
  const content = `name: ${name} \n email: ${email} \n message: ${message} `

  const mail = {
    from: name,
    to: USER,  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  mailer.sendMail(mail, (err, data) => {
    if (err) next(err)
    else res.json(data)
  })
}

module.exports = {
  email: emailRoute
}

//=============================================================================

// const mailer = require('../lib/mailer')
// const { USER } = require('../config/environment')
//
//
// function emailRoute(req, res, next){
//   const { name, email, message } = req.body
//   const content = `${name} has just sent you a message! ${message}`
//
//   const mail = {
//     from: name,
//     to: USER,  //Change to email address that you want to receive messages on
//     subject: 'New Message from Contact Form',
//     text: content,
//     replyTo: email
//   }
//
//   mailer.sendMail(mail, (err) => {
//     if (err) next(err)
//     else res.json({ message: 'Message sent' })
//   })
// }
//
// module.exports = {
//   email: emailRoute
// }
