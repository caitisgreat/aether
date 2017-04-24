var api, express, path, router;

api = require('./api');
express = require('express');
path = require('path');
router = express.Router();

(function() {
  'use strict';

  // anything beginning with "/api" will go into this
  router.use('/api', api);

  /**
   * Route to Home Page
   * @param  {Object} req the Request object
   * @param  {Object} res the Response object
   */
  let index = router.get('/', function(req, res) {
    res.render('index');
  });

  let templates = router.get('/templates/:name', function(req, res) {
    var name = req.params.name;
    res.render(name);
  });

  // redirect all others to the index (HTML5 history)
  router.get('*', function(req, res) {
    res.render('index');
  });

  module.exports = router;
})();
