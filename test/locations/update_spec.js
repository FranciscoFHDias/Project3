/* global api, describe, it, expect, beforeEach, afterEach */
const Location = require('../../models/Location')
const User = require('../../models/User')
const locationData = require('../../db/data/locationData')
const userData = require('../../db/data/userData')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testData = {
  name: 'Paternoster Chop House',
  address: '1, Warwick Court, Paternoster Sq., London EC4M 7DX',
  cost: 3,
  actType: [
    'Restaurants and Bars',
    'Relaxing'
  ],
  dateNum: [
    2
  ],
  image: 'https://www.paternosterchophouse.co.uk/wp-content/uploads/sites/23/2018/09/Paternoster_153_7547-1400x933.jpg',
  link: 'https://www.paternosterchophouse.co.uk/'
}

describe('PUT /locations/:id', () => {

  let location = null
  let token = null

  beforeEach(done => {
    Location.create(locationData)
      .then(locations => {
        location = locations[0]
        return User.create(userData)
      })
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
    api.put(`/api/locations/${location._id}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 200 response with a token', done => {
    api.put(`/api/locations/${location._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/locations/${location._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/api/locations/${location._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'address',
          'cost',
          'actType',
          'dateNum',
          'image',
          'link'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api.put(`/api/locations/${location._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.address).to.eq(testData.address)
        expect(res.body.cost).to.eq(testData.cost)
        expect(res.body.actType).to.deep.eq(testData.actType)
        expect(res.body.dateNum).to.deep.eq(testData.dateNum)
        expect(res.body.image).to.eq(testData.image)
        expect(res.body.link).to.eq(testData.link)
        done()
      })
  })
})
