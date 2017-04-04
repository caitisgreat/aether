var api, express, router;

api = require('./api');
express = require('express');
router = express.Router();

// anything beginning with "/api" will go into this
router.use('/api', api);

/**
 * Route to Home Page
 * @param  {Object} req the Request object
 * @param  {Object} res the Response object
 */
router.get('/', function(req, res) {
  res.render('index');
});

/**
 * Handle any unrouted requests
 * @param  {Object} req the Request object
 * @param  {Object} res the Response object
 */
router.get('*', function(req, res) {
  res.status(404).send(`Sorry, that page doesn't exist`);
});

module.exports = router;
