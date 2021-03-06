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
  const Forecast = require('../models/forecast.js');

  /**
   * getLocation returns a location object for a given location
   * @param  {[string]} location  A location as a string, this can mean many things
   * @return {[Promise]}          Promise for location data
   */

  module.exports.getLocation = (loc) => {
    const url = `http://api.wunderground.com/api/${wundergroundapikey}/geolookup/q/${loc}.json`;
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

            resolve(parsedData);
          }));
        });
      } catch (e) {
        reject(new ErrorMessage(500, e.message));
      }
    });
  };

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
            resolve(conditionsModel);
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

            let forecastPeriods = [];
            if("forecast" in parsedData && "simpleforecast" in parsedData.forecast) {
              let days = parsedData.forecast.simpleforecast.forecastday;
              for(let i = 0; i < days.length; i++) {
                let forecastModel = new Forecast().fromWunderground(days[i]);
                forecastPeriods.push(forecastModel);
              }
            }

            resolve(forecastPeriods);
          }));
        });
      } catch (e) {
        reject(new ErrorMessage(500, e.message));
      }
    });
  };
})();
