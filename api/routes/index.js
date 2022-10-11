const bodyParser = require('body-parser')
const universities = require('../routes/universitiesRoute')

module.exports = app => {
  app.use(bodyParser.json() ,universities)
}