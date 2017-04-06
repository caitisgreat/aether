var express, router, wunderground;

express = require('express');
router = express.Router();
wunderground = require('../weatherapis/wunderground');

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
router.get('/conditions/:zipcode', (req, res) => { 
  wunderground.getConditions(req.params.zipcode)
    .then((response) => {
      res.send(response);
    })
    .catch((errorMessage) => {
      res.status(errorMessage.statusCode).send({error: errorMessage.message});
    });
});

module.exports = router;
