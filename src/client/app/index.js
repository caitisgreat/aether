const angular = require('angular');
require('angular-route');
require('./home.js');
require('./about.js');

(function() {
  'use strict';

  angular.module('aether', [
      'ngRoute',
      'aether.home',
      'aether.about'
    ])

    /**
     * AppConfig
     * App module ngRoute configuration
     * @param {Object} $routeProvider Used for configuring routes.
     */
    .config(function AppConfig($routeProvider) {
      $routeProvider.otherwise({
        redirectTo: '/home'
      });
    })

    /**
     * AppController
     * The controller defined for Home route
     */
    .controller('AppCtrl', function AppController($scope) {});
})();
