'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BarSchema = new Schema({
	_id: String,
	going: Number,
	location: String
});

var CitySchema = new Schema({
  _id: String,
  bars: [BarSchema]
});

exports.Bar = mongoose.model('Bar', BarSchema);
exports.City = mongoose.model('City', CitySchema);