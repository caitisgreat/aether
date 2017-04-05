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
  });
})();
