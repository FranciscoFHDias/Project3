const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'
const dbURI = `mongodb://localhost:27017/project3-datingExp-db-${env}`
const secret = 'Tgs5aG_^GH@lKmnN=++/dgyhhebded'
const fileloaderKey = 'AYGiGjrSKpaWKAEudgKALz'

module.exports = { port, env, dbURI, secret, fileloaderKey }
