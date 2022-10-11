const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bis');

mongoose.Promise = global.Promise;

module.exports = mongoose;
