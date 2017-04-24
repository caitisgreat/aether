const angular = require('angular');
require('./weather.js');
require('./error.js');

(function() {
  'use strict';

  angular.module('aether.services.geolocation', [
      'aether.services.weather',
      'aether.services.error'
    ])

    /**
     * GeoLocationService
     * The geolocation service allows for access to HTML5 geolocation methods
     * This, in essence, lets you get the user's zipcode by using reverse geolookup
     * based on their listed geolocation (HTML5 navigator)
     * @param  {$service} $q             Angular Promise service
     * @param  {$service} WeatherFactory Weather API service
     * @return {$service}                GeoLocation service
     */
    .service('GeoLocationService', function($q, WeatherFactory, ErrorFactory) {
      /**
       * getLocation
       * Attempts to access the user agent's current location via the HTML5 geolocation API
       * @return {Promise} promises to resolve to a Position.Coordinates objec
       * @throws GeoServiceUnavailable The browser doesn't support geolocation.
       * @throws GeoPermissionDenied The acquisition of the geolocation information failed because the page didn't have the permission to do it.
       * @throws GeoTimeout The time allowed to acquire the geolocation, defined by PositionOptions.timeout information was reached before the information was obtained.
       * @throws GeoPositionUnavailable The acquisition of the geolocation failed because at least one internal source of position returned an internal error.
       */
      this.getLocation = function() {
        return $q((resolve, reject) => {
          if ("geolocation" in navigator) {
            let options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            };

            let success = function(pos) {
              resolve(pos.coords);
            };

            let error = function(err) {
              switch (err.code) {
                case 1: // Permission Denied
                  reject(ErrorFactory.make("GeoPermissionDenied", "The user refused to allow geolocation services to be used."));
                  break;
                case 3: // Timeout
                  reject(ErrorFactory.make("GeoTimeout", "The Position request failed due to time out."));
                  break;
                default:
                  reject(ErrorFactory.make("GeoPositionUnavailable", "The Position request failed.  Unable to acquire the user's position at this time."));
                  break;
              }
            };

            navigator.geolocation.getCurrentPosition(success, error, options);
          } else {
            reject(ErrorFactory.make("GeoServiceUnavailable", "This browser does not support geolocation services."));
          }
        });
      };

      /**
       * [description]
       * @param  {[type]} loc [description]
       * @return {[type]}     [description]
       */
      this.doLookup = function(loc) {
        return WeatherFactory.getLocation(loc);
      };
    });
})();
