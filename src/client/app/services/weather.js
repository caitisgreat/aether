const angular = require('angular');

(function () {
  'use strict';

  angular.module('aether.services.weather', [])
  .factory('WeatherFactory', ['$http', function ($http) {
    let baseUrl = "/api";
    let weatherFactory = {};

    weatherFactory.getLocation = function (location) {
      return $http.get(urlBase + "/location/" + location);
    }

    weatherFactory.getConditions = function (zipCode) {
      return $http.get(urlBase + "/conditions/" + zipCode);
    };

    weatherFactory.getForecast = function (zipCode) {
      return $http.get(urlBase + "/forecast/" + zipCode);
    };

    return weatherFactory;
  }]);

})();
