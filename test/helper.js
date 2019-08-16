process.env.NODE_ENV = 'test' // set the app to "test mode"

const chai = require('chai')
global.expect = chai.expect // make chai's expect function globally available

const supertest = require('supertest')
const app = require('../index')
global.api = supertest(app) // create a testable API from our app
