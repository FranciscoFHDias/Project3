/* global api, describe, it, expect, beforeEach, afterEach */
const Location = require('../../models/Location')
const User = require('../../models/User')
const locationData = require('../../db/data/locationData')
const userData = require('../../db/data/userData')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

xdescribe('DELETE /locations/:id/comments/:commentId', () => {

  let location = null
  let token = null
  let comment = null

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
    api.delete(`/api/locations/${location._id}/comments/${comment._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/locations/${location._id}/comments/${comment._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should actually delete the data', done => {
    api.delete(`/api/locations/${location._id}/comments/${comment._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        Location.findById(location._id)
          .then(location => {
            expect(location).to.not.exist
            done()
          })
      })
  })
})
