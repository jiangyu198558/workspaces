// Generated by CoffeeScript 1.12.7
(function() {
  angular.module('tmsApp', ['ngRoute']).config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/login', {
        templateUrl: '/app/login/index.html',
        controller: 'LoginCtrl'
      }).when('/register', {
        templateUrl: '/app/register/index.html',
        controller: 'RegisterCtrl'
      });
    }
  ]).run([
    '$location', function($location) {
      return $location.path('/login').replace();
    }
  ]);

}).call(this);
