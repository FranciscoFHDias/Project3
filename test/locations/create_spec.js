/* global api, describe, it, expect, afterEach, beforeEach */
const Location = require('../../models/Location')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testUser = require('../../db/data/userData')

const testData = {
  name: 'Paternoster Chop House',
  addressLine1: '1, Warwick Court',
  addressLine2: 'Paternoster Sq.',
  addressCity: 'London',
  addressPostCode: 'EC4M 7DX',
  cost: 3,
  actType: [
    'Restaurants and Bars', 'Relaxing'
  ],
  dateNum: [
    2
  ],
  desc: 'There is an unrivalled charm about St Pauls that continually draws in the hoards of people visiting the area. Perfect place to share their Grilled Tiger Prawns.',
  image: 'https://www.paternosterchophouse.co.uk/wp-content/uploads/sites/23/2018/09/Paternoster_153_7547-1400x933.jpg',
  contactNumber: +442070299400,
  link: 'https://www.paternosterchophouse.co.uk/'
}

describe('POST /locations', () => {

  let token

  beforeEach(done => {
    User.create(testUser)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '167h' })
        done()
      })
  })

  afterEach(done => {
    Location.remove({})
      .then(() => User.remove({}))
      .then(() => done())
  })


  it('should return a 401 response without a token', done => {
    api
      .post('/api/locations')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api
      .post('/api/locations')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api
      .post('/api/locations')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api
      .post('/api/locations')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'addressLine1',
          'addressLine2',
          'addressCity',
          'addressPostCode',
          'longitude',
          'latitude',
          'actType',
          'cost',
          'dateNum',
          'desc',
          'image',
          'contactNumber',
          'link'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .post('/api/locations')
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.addressLine1).to.eq(testData.addressLine1)
        expect(res.body.addressLine2).to.eq(testData.addressLine2)
        expect(res.body.addressCity).to.eq(testData.addressCity)
        expect(res.body.addressPostCode).to.eq(testData.addressPostCode)
        expect(res.body.cost).to.eq(testData.cost)
        expect(res.body.actType).to.deep.eq(testData.actType)
        expect(res.body.dateNum).to.deep.eq(testData.dateNum)
        expect(res.body.image).to.eq(testData.image)
        expect(res.body.contactNumber).to.eq(testData.contactNumber)
        expect(res.body.link).to.eq(testData.link)
        done()
      })
  })
})
