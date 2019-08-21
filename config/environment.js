const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/project3-datingExp-db-${env}`
const secret = process.env.SECRET || 'Tgs5aG_^GH@lKmnN=++/dgyhhebded'


const USER = 'daframiso.project3@gmail.com'
const PASS = 'daframiso2019'



module.exports = { port, env, dbURI, secret, USER, PASS }
