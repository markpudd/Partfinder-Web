'use strict';


// Declare app level module which depends on views, and components
var partFinderApp = angular.module('partFinderApp', [
  'ngRoute',
  'partControllers',
  'pickListControllers',
  'storeControllers',
  'configControllers',
  'loginControllers',
  'partsService',
  'storesService',
  'configsService',
  'pickListsService',
  'loginService'
]);

partFinderApp.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
  $httpProvider.interceptors.push(['$q','$location','Login',function($q,$location,Login) {
      return {
       'request': function(config) {
            console.log(Login.auth_token);
            config.headers['Authorization'] = Login.auth_token;
            return config;
        },
        'responseError': function (responseError) {
            if (responseError.status == 401) {
              $location.url('/login.html');
            }
            return $q.reject(responseError);
        }
      };
    }]);
  $routeProvider.otherwise({redirectTo: '/parts.html/cat/Tiles'});
}]);
