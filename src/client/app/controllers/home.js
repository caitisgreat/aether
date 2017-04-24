const angular = require('angular');
require('../services/error');
require('../services/weather');
require('../services/geolocation');
require('../directives/conditions');

(function() {
  'use strict';

  angular.module('aether.home', [
      'aether.services.weather',
      'aether.services.geolocation',
      'aether.services.error',
      'aether.directives.conditions'
    ])

    /**
     * HomeController
     * The controller defined for Home route
     */
    .controller('HomeCtrl', function HomeController($scope, GeoLocationService, WeatherFactory, ErrorFactory) {
      // when constructing the home controller, check to see if the value $scope.zipCode is set.
      // if not, use geolocation to get the user's current location (if they allow you to) and set the value
      // otherwise assume they didn't trust us and allow them to enter it themselves.
      if (angular.isUndefined($scope.location)) {
        GeoLocationService.getLocation()
          .then((coords) => {
            let location = coords.latitude + "," + coords.longitude;
            return GeoLocationService.doLookup(location);
          })
          .then((res) => {
            if ("error" in res.data)
              throw ErrorFactory.make("ServiceError", res.data.error);

            $scope.location = res.data.location;
            $scope.zipCode = $scope.location.zip;
          })
          .catch((err) => {
            console.error(err.Message);
          });
      }

      /*
      $scope.$watch('zipCode', function() {
        WeatherFactory.getConditions($scope.zipCode)
          .then((result) => {
            $scope.conditions = JSON.parse(result.data);
            console.log($scope.conditions);
          })
          .catch((e) => {
            console.error(e.message);
          });
      });
      */
    });
})();
