/* global api, describe, it, expect, beforeEach, afterEach */
const Location = require('../../models/Location')
const locationData = require('../../db/data/locationData')

describe('GET /locations/:id', () => {

  let location = null

  beforeEach(done => {
    Location.create(locationData)
      .then(locations => {
        location = locations[0]
        done()
      })
  })

  afterEach(done => {
    Location.remove({})
      .then(() => done())
  })

  it('should return a 200 response with a token', done => {
    api.get(`/api/locations/${location._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/locations/${location._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/api/locations/${location._id}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'addressLine1',
          'addressLine2',
          'addressCity',
          'addressPostCode',
          'latitude',
          'longitude',
          'cost',
          'actType',
          'dateNum',
          'image',
          'contactNumber',
          'link'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get(`/api/locations/${location._id}`)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.addressLine1).to.be.a('string')
        expect(res.body.addressLine2).to.be.a('string')
        expect(res.body.addressCity).to.be.a('string')
        expect(res.body.addressPostCode).to.be.a('string')
        expect(res.body.latitude).to.be.a('number')
        expect(res.body.longitude).to.be.a('number')
        expect(res.body.cost).to.be.a('number')
        expect(res.body.actType).to.be.an('array')
        expect(res.body.dateNum).to.be.an('array')
        expect(res.body.image).to.be.a('string')
        expect(res.body.contactNumber).to.be.a('number')
        expect(res.body.link).to.be.a('string')
        done()
      })
  })
})
