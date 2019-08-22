
/* global api, describe, beforeEach, afterEach, it, expect */

const User = require('../../models/User')
const userData = require('../../db/data/userData')

describe('GET /profiles/:id',() => {

  let profile = null

  beforeEach(done => {
    User.create(userData)
      .then(profiles => {
        profile = profiles[0]
        done()
      })
  })

  afterEach(done => {
    User.remove({})
      .then(() => done())
  })

  it('should send a 200 response', done => {
    api.get(`/profiles/${profile._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/profiles/${profile._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/profiles/${profile._id}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'username',
          'email',
          'image',
          'age',
          'gender',
          'smoker'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get(`/profiles/${profile._id}`)
      .end((err, res) => {
        expect(res.body.username).to.be.a('string')
        expect(res.body.email).to.be.a('string')
        expect(res.body.image).to.be.a('string')
        expect(res.body.age).to.be.a('number')
        expect(res.body.gender).to.be.a('string')
        expect(res.body.smoker).to.be.a('boolean')
        done()
      })
  })
})
