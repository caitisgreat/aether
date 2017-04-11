var express, router, wunderground, errorMessage;

express = require('express');
router = express.Router();
wunderground = require('../weatherapis/wunderground');
errorMessage = require('../models/errorMessage.js');

/**
 * Ping test method
 * @param  {Object} req the Request object
 * @param  {Object} res the Response object
 * @return JSON Object { ping : "Pong" }
 */
router.get('/ping', function(req, res) {
  res.json({ ping: 'pong' });
});

/**
 * Get conditions method
 * @param  {Object} req the Request object
 * @param  {Object} res the Response object
 * @return JSON Object { conditions: {} }
 */
router.get('/conditions/:zipcode?', (req, res) => { 
  if (req.params.zipcode != null) {
    wunderground.getConditions(req.params.zipcode)
      .then((response) => {
        res.send(response);
      })
      .catch((errorMessage) => {
        res.status(errorMessage.statusCode).send({error: errorMessage.message});
    });
  } else {
    res.status(400).send({error: 'Zip code value is required'});
  }

});

/**
 * Get forecast method
 * @param  {Object} req the Request object
 * @param  {Object} res the Response object
 * @return JSON Object { conditions: {} }
 */
router.get('/forecast/:zipcode?', (req, res) => { 
  if (req.params.zipcode != null) {
    wunderground.getForecast(req.params.zipcode)
      .then((response) => {
        res.send(response);
      })
      .catch((errorMessage) => {
        res.status(errorMessage.statusCode).send({error: errorMessage.message});
    });
  } else {
    res.status(400).send({error: 'Zip code value is required'});
  }
});

module.exports = router;
