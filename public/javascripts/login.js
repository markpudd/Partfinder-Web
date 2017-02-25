'use strict';

var loginControllers = angular.module('loginControllers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login.html', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    })
}]);



loginControllers.controller('LoginController', ['$scope', 'Login', '$location', '$http', function($scope, Login,$location,$http) {
    $scope.submit = function() {
        $http({
            method: 'POST',
            url: '/login',
            data: $scope.user
        }).success(function(data) {
            console.log(data.token);
            Login.auth_token = 'JWT '+data.token;
            $location.path("/parts.html/cat/Tiles");
        });
    };

}]);
