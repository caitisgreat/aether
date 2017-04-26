var express, router;

express = require('express');
router = express.Router();

/**
 * Services
 */

const Validator = require('../services/validator');
const Wunderground = require('../services/wunderground');

(function() {
  'use strict';

  /**
   * Ping test method
   * @param  {Object} req the Request object
   * @param  {Object} res the Response object
   * @return JSON Object { ping : "Pong" }
   */
  router.get('/ping', function(req, res) {
    res.json({
      "ping": "pong"
    });
  });


  /**
   * Get location(s) method
   * @param  {Object} req the Request object
   * @param  {Object} res the Response object
   * @return JSON Object { locations: {} }
   */
  router.get('/location/:location?', (req, res) => {
    let location = req.params.location;
    let locationRules = [{
      rules: ['required'],
      name: 'Location',
      value: location
    }];

    // TODO add more validation for location types
    //   this includes "State/City", "Country/City", "zipcode", and "Lat,Lon"

    (new Validator())
    .validate(locationRules)
      .then(() => {
        return Wunderground.getLocation(location);
      })
      .then((data) => {
        res.send(data);
      })
      .catch((e) => {
        let error = JSON.stringify({
          error: e.message
        });
        res.status(e.statusCode).send(error);
      });

  });

  /**
   * Get conditions method
   * @param  {Object} req the Request object
   * @param  {Object} res the Response object
   * @return JSON Object { conditions: {} }
   */
  router.get('/conditions/:zipcode?', (req, res) => {
    let zipcode = req.params.zipcode;
    let conditionsRules = [{
      rules: ['required', 'pattern(^\\d{5}(?:[-\\s]\\d{4})?$)'],
      name: 'Zip Code',
      value: zipcode
    }];

    (new Validator())
    .validate(conditionsRules)
      .then(() => {
        return Wunderground.getConditions(zipcode);
      })
      .then((data) => {
        res.json(data);
      })
      .catch((e) => {
        let error = JSON.stringify({
          error: e.message
        });
        res.status(e.statusCode).send(error);
      });
  });

  /**
   * Get forecast method
   * @param  {Object} req the Request object
   * @param  {Object} res the Response object
   * @return JSON Object { forecast: {} }
   */
  router.get('/forecast/:zipcode?', (req, res) => {
    let zipcode = req.params.zipcode;
    let forecastRules = [{
      rules: ['required', 'pattern(^\\d{5}(?:[-\\s]\\d{4})?$)'],
      name: 'Zip Code',
      value: zipcode
    }];

    (new Validator())
    .validate(forecastRules)
      .then(() => {
        return Wunderground.getForecast(zipcode);
      })
      .then((data) => {
        res.send(data);
      })
      .catch((e) => {
        let error = JSON.stringify({
          error: e.message
        });
        res.status(e.statusCode).send(error);
      });
  });

  module.exports = router;
})();
