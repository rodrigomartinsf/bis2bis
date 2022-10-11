const mongoose = require('../../api/config/dbConnection')

const UniversitySchema = new mongoose.Schema({
  country: {
    type: String
  },
  web_pages: {
    type: Array,
    lowercase: true,
  },
  name: {
    type: String
  },
  state_province: {
    type: String
  },
  alpha_two_code: {
    type: String
  },
  domains: {
    type: Array
  }
});


const University = mongoose.model('University', UniversitySchema)

module.exports = University
