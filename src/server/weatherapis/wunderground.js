'use strict';

var http = require('http');
var bl = require('bl');
var errorMessage = require('../models/errorMessage.js');
var config = require('../config.json');

/**
 * getConditions returns the weather conditions for a given zipcode
 * @param  {[string]} zipcode zipcode to return weather of
 * @return {[Promise]}         Promise of weather condition data
 */
module.exports.getConditions = (zipcode) => {
  return new Promise((resolve, reject) => {
    if(validZip(zipcode)){
      reject(new errorMessage(404, "Invalid zipcode"));
    }
    else{
      const wundergroundapikey = config.wundergroundapikey;
      const url = `http://api.wunderground.com/api/${wundergroundapikey}/conditions/q/${zipcode}.json`;
      http.get(url,(res) => {
        res.pipe(bl((err, data) => {
          try{
            let parsedData = JSON.parse(data);
            if(parsedData.response.error){
              let message = parsedData.response.error.description;
              reject(new errorMessage(404, message));
            }
            else{
              resolve(parsedData);
            }
          } catch(e){
            reject(new errorMessage(500, e));
          }
        }));
      });
    }
  });
};

module.exports.getForecast = (zipcode) => {
  return new Promise((resolve, reject) => {
    if(!validZip){
      reject(new errorMessage(404, "Invalid zipcode"));
    }
    else{
      const wundergroundapikey = config.wundergroundapikey;
      const url = `http://api.wunderground.com/api/${wundergroundapikey}/forecast/geolookup/q/${zipcode}.json`;
      http.get(url,(res) => {
        res.pipe(bl((err, data) => {
          try{
            let parsedData = JSON.parse(data);
            if(parsedData.response.error){
              let message = parsedData.response.error.description;
              reject(new errorMessage(404, message));
            }
            else{
              resolve(parsedData);
            }
          } catch(e){
            reject(new errorMessage(500, e));
          }
        }));
      });
    }
  });
};

var validZip = function (zipCode) {
  return (zipCode != null && /^\d{5}$/.test(zipCode));
}
