var angular = require('angular');

(function () {
  'use strict';

  angular.module("aether.about", [])

/**
 * AboutConfig
 * About module ngRoute configuration
 * @param {Object} $routeProvider Used for configuring routes.
 */
  .config(function AboutConfig ($routeProvider) {
    $routeProvider.when('/about', {
      templateUrl: 'templates/about.pug',
      controller: 'AboutCtrl'
    });
  })

/**
 * AboutController
 * The controller defined for About route
 */
  .controller('AboutCtrl', function AboutController ($scope) {
  });

})();
