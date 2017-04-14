let http, bl, config;

http = require('http');
bl = require('bl');
config = require('../config.json');

(function() {
  'use strict';

  /**
   * Constants
   */

  const wundergroundapikey = config.wundergroundapikey;

  /**
   * Models
   */
  const ErrorMessage = require('../models/errorMessage.js');
  const Conditions = require('../models/conditions.js');

  /**
   * getConditions returns the weather conditions for a given zipcode
   * @param  {[string]} zipcode zipcode to return weather of
   * @return {[Promise]}         Promise for weather condition data
   */
  module.exports.getConditions = (zipcode) => {
    const url = `http://api.wunderground.com/api/${wundergroundapikey}/conditions/q/${zipcode}.json`;
    return new Promise((resolve, reject) => {
      try {
        http.get(url, (res) => {
          res.pipe(bl((err, data) => {
            let parsedData = JSON.parse(data);

            // handle errors from Weather Underground
            if (parsedData.response.error) {
              let errMessage = parsedData.response.error.description;
              return reject(new ErrorMessage(404, errMessage));
            }

            // map Weather Underground data to Conditions model
            let conditionsModel = new Conditions().fromWunderground(parsedData);
            var result = JSON.stringify(conditionsModel);
            resolve(result);
          }));
        });
      } catch (e) {
        reject(new ErrorMessage(500, e.message));
      }
    });
  };

  module.exports.getForecast = (zipcode) => {
    const url = `http://api.wunderground.com/api/${wundergroundapikey}/forecast/geolookup/q/${zipcode}.json`;
    return new Promise((resolve, reject) => {
      try {
        http.get(url, (res) => {
          res.pipe(bl((err, data) => {
            let parsedData = JSON.parse(data);

            // handle errors from Weather Underground
            if (parsedData.response.error) {
              let errMessage = parsedData.response.error.description;
              return reject(new ErrorMessage(404, errMessage));
            }

            // map Weather Underground data to Forecast model
            // TODO
            resolve(parsedData);
          }));
        });
      } catch (e) {
        reject(new ErrorMessage(500, e.message));
      }
    });
  };
})();
