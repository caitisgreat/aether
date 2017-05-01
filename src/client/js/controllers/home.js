const angular = require('angular');
require('../services/error');
require('../services/weather');
require('../services/geolocation');
require('../directives/conditions');
require('../directives/forecast');

(function() {
  'use strict';

  angular.module('aether.home', [
      'aether.services.weather',
      'aether.services.geolocation',
      'aether.services.error',
      'aether.directives.conditions',
      'aether.directives.forecast'
    ])

    /**
     * HomeController
     * The controller defined for Home route
     */
    .controller('HomeCtrl', function HomeController($scope, $timeout, $q, GeoLocationService, WeatherFactory, ErrorFactory) {
      // when constructing the home controller, check to see if the value $scope.zipCode is set.
      // if not, use geolocation to get the user's current location (if they allow you to) and set the value
      // otherwise assume they didn't trust us and allow them to enter it themselves.
      if (angular.isUndefined($scope.location)) {
        GeoLocationService.getLocation()
          .then((coords) => {
            let location = coords.latitude + "," + coords.longitude;
            return GeoLocationService.doLookup(location);
          })
          .then((response) => {
            if ("error" in response.data)
              throw ErrorFactory.make("ServiceError", response.data.error);

            $scope.location = response.data.location;
            $scope.zipCode = $scope.location.zip;
          })
          .then(() => {
            return $q.all([WeatherFactory.getConditions($scope.zipCode), WeatherFactory.getForecast($scope.zipCode)]);
          })
          .then((result) => {
            if ("error" in result[0].data)
              throw ErrorFactory.make("ServiceError", result[0].data.error);

            if ("error" in result[1].data)
              throw ErrorFactory.make("ServiceError", result[1].data.error);

            $scope.conditions = result[0].data;
            $scope.forecast = result[1].data;
          })
          .catch((err) => {
            console.error(err.Message);
          });
      }

      $scope.getConditions = function() {
        WeatherFactory.getConditions($scope.zipCode)
          .then((res) => {
            if ("error" in res.data)
              throw ErrorFactory.make("ServiceError", res.data.error);

            $scope.conditions = res.data;
          });
      };

      $scope.getForecast = function() {
        WeatherFactory.getForecast($scope.zipCode)
          .then((res) => {
            if ("error" in res.data)
              throw ErrorFactory.make("ServiceError", res.data.error);

            $scope.forecast = res.data;
          });
      };
    });
})();
