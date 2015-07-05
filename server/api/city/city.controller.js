'use strict';

var _ = require('lodash');
var models = require('./city.model'),
    City = models.City,
    Bar = models.Bar;

// Get list of citys
exports.index = function(req, res) {
  City.find(function (err, citys) {
    if(err) { return handleError(res, err); }
    return res.json(200, citys);
  });
};

// Get a single city
exports.show = function(req, res) {
  City.findById(req.params.id, function (err, city) {
    if(err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    return res.json(city);
  });
};

// Creates a new city in the DB.
exports.create = function(req, res) {
  City.create(req.body, function(err, city) {
    if(err) { return handleError(res, err); }
    return res.json(201, city);
  });
};

// Updates an existing city in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  City.findById(req.params.id, function (err, city) {
    if (err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    var updated = _.merge(city, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, city);
    });
  });
};

exports.updateBar = function(req,res) {
  var cityId = req.params.id;
  var barId = req.params.barId.replace('%20', ' ');
  City.findById(cityId, function(err, city) {
    if (err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    city.bars.forEach(function(bar){
      if(bar._id === barId) {
        var updated = _.merge(bar, req.body);
        city.save(function (err) {
          if (err) { return handleError(res, err); }
          return res.json(200, city);
        });
      }
    })
  });
};

// Deletes a city from the DB.
exports.destroy = function(req, res) {
  City.findById(city, function (err, city) {
    if(err) { return handleError(res, err); }
    if(!city) { return res.send(404); }
    city.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}