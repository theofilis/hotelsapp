var youlovei = angular.module('youlovei', ['youlovei.controllers', 'ngRoute']);

youlovei.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/index.html',
    controller: 'MainController'
  }).
  when('/results', {
    templateUrl: 'partials/results.html',
    controller: 'ResultsController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);


var analysis = angular.module('analysis', ['analysis.controllers', 'ngRoute']);

analysis.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/analysis.html',
    controller: 'AnalysisController'
  }).
  
  otherwise({
    redirectTo: '/'
  });
}]);