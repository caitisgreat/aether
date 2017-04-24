const angular = require('angular');

(function() {
  'use strict';

  angular.module('aether.directives.conditions', [])
  .directive("conditions", function() {
    return {
      templateUrl: 'templates/conditions.pug',
      restrict: 'C',
      replace: true
    };
  });
})();
