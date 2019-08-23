/* global api, describe, it, expect, beforeEach, afterEach */
const User = require('../../models/User')
const userData = require('../../db/data/userData')

describe('GET /profiles', () => {

  beforeEach(done => {
    User.create(userData)
      .then(() => done())
  })

  afterEach(done => {
    User.remove({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        res.body.forEach(profile => {
          expect(profile).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        res.body.forEach(profile => {
          expect(profile).to.contains.keys([
            '_id',
            'username',
            'email',
            'image',
            'age',
            'gender',
            'smoker'
          ])
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        res.body.forEach(profile => {
          expect(profile.username).to.be.a('string')
          expect(profile.email).to.be.a('string')
          expect(profile.image).to.be.a('string')
          expect(profile.age).to.be.a('number')
          expect(profile.gender).to.be.a('string')
          expect(profile.smoker).to.be.a('boolean')
        })
        done()
      })
  })
})
