const angular = require('angular');

(function() {
  'use strict';

  angular.module('aether.directives.forecast', [])
  .directive("forecast", function() {
    return {
      templateUrl: 'templates/forecast.pug',
      restrict: 'E',
      replace: true
    };
  });
})();
