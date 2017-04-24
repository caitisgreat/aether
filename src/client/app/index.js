const angular = require('angular');
require('angular-route');
require('./controllers/home.js');
require('./controllers/about.js');

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
    .config(function AppConfig($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/home.pug',
          controller: 'HomeCtrl'
        })
        .when('/about', {
          templateUrl: 'templates/about.pug',
          controller: 'AboutCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
      $locationProvider.hashPrefix("").html5Mode(true);
    })

    /**
     * AppController
     * The controller defined for Home route
     */
    .controller('AppCtrl', function AppController($scope) {});
})();
