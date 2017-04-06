var express, router;

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
 * Ping test method
 * @param  {Object} req the Request object
 * @param  {Object} res the Response object
 * @return JSON Object { conditions: {} }
 */
router.get('/conditions/:zipcode', function(req, res){
  res.json({ conditions: "test"});
});

module.exports = router;
