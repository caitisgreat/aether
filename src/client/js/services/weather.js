// TODO add client side validation to angular calls

const angular = require('angular');

(function() {
  'use strict';

  angular.module('aether.services.weather', [])
    /**
     * WeatherFactory
     * The Weather Service API which allows us to retrieves
     * weather conditions, forecasts, alerts, and locations
     * @param  {$service} $http HTTP Request/Response Async. service
     * @return {$service}       The Weather API service
     */
    .factory('WeatherFactory', function($http) {
      let baseUrl = "/api";
      return {
        /**
         * getLocation
         * retrieves data from the location end point
         * [api/location/:location]
         * @param  {String} location  a string representation of a location
         * @return {Promise}           Expanded data about that location
         */
        getLocation: function(location) {
          return $http.get(baseUrl + "/location/" + location);
        },

        /**
         * getConditions
         * retrieves data from the conditions end point
         * [api/conditions/:zipCode]
         * @param  {String} zipCode  zip or postal code (5 or 9 digit)
         * @return {Promise}          current conditions for that postal code
         */
        getConditions: function(zipCode) {
          return $http.get(baseUrl + "/conditions/" + zipCode);
        },

        /**
         * getForecast
         * retrieves data from the forecast end point
         * [api/forecast/:zipCode]
         * @param  {String} zipCode  zip or postal code (5 or 9 digit)
         * @return {Promise}          forecast for that postal code
         */
        getForecast: function(zipCode) {
          return $http.get(baseUrl + "/forecast/" + zipCode);
        }
      };
    });
})();
