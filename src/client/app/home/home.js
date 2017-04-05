(function () {
  'use strict';

  angular.module("aether.home", [])

/**
 * HomeConfig
 * Home module ngRoute configuration
 * @param {Object} $routeProvider Used for configuring routes.
 */
  .config(function HomeConfig ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'home.tpl.html',
      controller: 'HomeCtrl'
    });
  })

/**
 * HomeController
 * The controller defined for Home route
 */
  .controller('HomeCtrl', function HomeController ($scope) {
  });

})();
