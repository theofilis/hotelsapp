angular.module('youlovei.routes', ['ngRoute', 'youlovei.controllers']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/test', {
    templateUrl: 'partials/index.html',
    controller: 'CampingController'
  }).
  when('/results', {
    templateUrl: 'partials/results.html',
    controller: 'CampingController'
  });
}]);