'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var barSchema = new Schema({
	_id: String,
	going: Number,
	location: String
});

var CitySchema = new Schema({
  _id: String,
  bars: [barSchema]
});

module.exports = mongoose.model('Bar', barSchema);
module.exports = mongoose.model('City', CitySchema);