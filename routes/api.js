var express, router;

express = require('express');
router = express.Router();

/**
 * Ping test method
 * @param  {Object} req the Request object
 * @param  {Object} res the Response object
 * @return JSON Object { ping : "Pong" }
 */
router.get('/ping', function(req, res) {
  res.json({ ping: 'pong' });
});

module.exports = router;
