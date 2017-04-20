const angular = require('angular');
require('./services/weather')

(function() {
  'use strict';

  angular.module("aether.home", [
      'aether.services.weather'
    ])

    /**
     * HomeConfig
     * Home module ngRoute configuration
     * @param {Object} $routeProvider Used for configuring routes.
     */
    .config(function HomeConfig($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/home.pug',
        controller: 'HomeCtrl'
      });
    })

    /**
     * HomeController
     * The controller defined for Home route
     */
    .controller('HomeCtrl', ['$scope', 'WeatherFactory',
      function HomeController($scope, WeatherFactory) {
        // when constructing the home controller, check to see if the value $scope.input.zipCode is set.
        // if not, use geolocation to get the user's current location (if they allow you to) and set the value
        // otherwise assume they didn't trust us and allow them to enter it themselves.

        $scope.input = { zipCode: '18031' };
      }
    ]);

})();
