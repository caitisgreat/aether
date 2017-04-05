var angular = require('angular');

(function () {
  'use strict';

  angular.module("aether", [
    'aether.home',
    'aether.about'
  ])

  /**
   * AppConfig
   * App module ngRoute configuration
   * @param {Object} $routeProvider Used for configuring routes.
   */
  .config(function AppConfig ($routeProvider) {
    $routeProvider.otherwise(
      {
        redirectTo: '/home'
      });
  })

  /**
   * AppController
   * The controller defined for Home route
   */
    .controller('HomeCtrl', function AppController ($scope) {
    });
})();
