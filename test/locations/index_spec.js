/* global api, describe, it, expect, beforeEach, afterEach */
const Location = require('../../models/Location')
const locationData = require('../../db/data/locationData')
describe('GET /locations', () => {

  beforeEach(done => {
    Location.create(locationData)
      .then(() => done())
  })

  afterEach(done => {
    Location.remove({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/locations')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/locations')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/locations')
      .end((err, res) => {
        res.body.forEach(location => {
          expect(location).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/locations')
      .end((err, res) => {
        res.body.forEach(location => {
          expect(location).to.contains.keys([
            '_id',
            'name',
            'address',
            'cost',
            'actType',
            'dateNum',
            'image',
            'contactNumber',
            'link'
          ])
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get('/api/locations')
      .end((err, res) => {
        res.body.forEach(location => {
          expect(location._id).to.be.a('string')
          expect(location.name).to.be.a('string')
          expect(location.address).to.be.an('string')
          expect(location.cost).to.be.an('number')
          expect(location.actType).to.be.a('array')
          expect(location.dateNum).to.be.a('array')
          expect(location.image).to.be.a('string')
          expect(location.contactNumber).to.be.a('number')
          expect(location.link).to.be.a('string')
        })
        done()
      })
  })
})
