let http, bl, config;

http = require('http');
bl = require('bl');
config = require('../config.json');

(function() {
  'use strict';

  /**
   * Models
   */
  const ErrorMessage = require('../models/errorMessage.js');
  const Conditions = require('../models/conditions.js');

  /**
   * getConditions returns the weather conditions for a given zipcode
   * @param  {[string]} zipcode zipcode to return weather of
   * @return {[Promise]}         Promise of weather condition data
   */
  module.exports.getConditions = (zipcode) => {
    return new Promise((resolve, reject) => {
      if (!validZip(zipcode)) {
        reject(new ErrorMessage(404, "Invalid zipcode"));
      } else {
        const wundergroundapikey = config.wundergroundapikey;
        const url = `http://api.wunderground.com/api/${wundergroundapikey}/conditions/q/${zipcode}.json`;
        http.get(url, (res) => {
          res.pipe(bl((err, data) => {
            try {
              let parsedData = JSON.parse(data);
              if (parsedData.response.error) {
                let message = parsedData.response.error.description;
                reject(new ErrorMessage(404, message));
              } else {
                var condObject = new Conditions();
                condObject.fromWunderground(parsedData);
                console.log(condObject);
                resolve({ parsedData: parsedData, condObject: condObject});
              }
            } catch(e) {
              reject(new ErrorMessage(500, e.message));
            }
          }));
        });
      }
    });
  };

  module.exports.getForecast = (zipcode) => {
    return new Promise((resolve, reject) => {
      if (!validZip(zipcode)) {
        reject(new ErrorMessage(404, "Invalid zipcode"));
      } else {
        const wundergroundapikey = config.wundergroundapikey;
        const url = `http://api.wunderground.com/api/${wundergroundapikey}/forecast/geolookup/q/${zipcode}.json`;
        http.get(url, (res) => {
          res.pipe(bl((err, data) => {
            try {
              let parsedData = JSON.parse(data);
              if (parsedData.response.error) {
                let message = parsedData.response.error.description;
                reject(new ErrorMessage(404, message));
              } else {
                resolve(parsedData);
              }
            } catch (e) {
              reject(new errorMessage(500, e.message));
            }
          }));
        });
      }
    });
  };

  var validZip = function(zipCode) {
    return (zipCode !== null && /^\d{5}$/.test(zipCode));
  };

})();
