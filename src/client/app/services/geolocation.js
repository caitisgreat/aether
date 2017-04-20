const angular = require('angular');
require('./weather.js')

(function() {
  'use strict';

  angular.module('aether.services.geolocation', [
      'aether.services.weather'
    ])

    /**
     * GeoLocationService
     * The geolocation service allows for access to HTML5 geolocation methods
     * This, in essence, lets you get the user's zipcode by using reverse geolookup
     * based on their listed geolocation (HTML5 navigator)
     * @param  {$service} $http          HTTP Request/Response service
     * @param  {$service} WeatherFactory Weather API Service
     * @return {$service}                GeoLocation Service
     */

    .service('GeoLocationService', ['$scope', '$q', 'WeatherFactory', function($scope, $q, WeatherFactory) {
      this.lastRetrievedLocation = 0;
      this.getLocation = function(force = false) {
        return $q((resolve, reject) => {
          if ("geolocation" in navigator) {
            let options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: (!force ? (this.lastRetrievedLocation >= 0 ? (new Date().getTime() - lastRetrievedLocation) : 0) : 0)
            };

            let success = function(pos) {
              lastRetrievedLocation = pos.timestamp;
              resolve(pos.coords);
            };

            let error = function(err) {
              reject(err.message);
            };

            console.log(options);
            navigator.geolocation.getCurrentPosition(success, error, options);
          } else {
            reject("geolocation is not available");
          }
        });
      };
    }]);
})();
