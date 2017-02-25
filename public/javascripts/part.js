'use strict';

var partControllers = angular.module('partControllers', []);

partControllers.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/categories.html', {
        templateUrl: 'partials/categories.html',
        controller: 'CategoriesController'
    }).when('/parts.html/cat/:category', {
        templateUrl: 'partials/parts.html',
        controller: 'PartsController'
    }).when('/parts.html/:pid', {
        templateUrl: 'partials/part.html',
        controller: 'PartController'
    }).when('/new_part.html/:pid', {
        templateUrl: 'partials/new_part.html',
        controller: 'PartController'
    }).when('/edit_part.html/:pid', {
        templateUrl: 'partials/new_part.html',
        controller: 'PartController'
    });
}]);



partControllers.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

partControllers.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);




partControllers.controller('CategoriesController', ['$scope', '$http', 'Parts', function($scope,  $http,Parts) {
    $scope.categories = Parts.categories();
}]);


partControllers.controller('PartsController', ['$scope', '$http', '$routeParams', 'Parts', function($scope, $http, $routeParams, Parts) {
    $scope.categories =  Parts.categories( function() {
          $scope.categorySelected = $routeParams.category;
    });

    $scope.parts = Parts.query({category:$routeParams.category}, function() {
    	console.log( $scope.parts);
    });

    $scope.categoryChanged = function() {
        $scope.parts = Parts.query({category:$scope.categorySelected});
    }

}]);


partControllers.controller('PartController', ['$scope', '$location', '$http', '$routeParams','fileUpload', function($scope, $location, $http, $routeParams,fileUpload) {
    $scope.config = [];
    $scope.editorEnabled = false;
    $scope.submit_type = 'POST';
    $scope.cfgSelected = {};
    $scope.part = {
        description: "",
    };
    $scope.parts_list = [];



    $scope.init = function() {
        if ($routeParams.pid != "new") {
            $scope.submit_type = 'PUT';
            $http.get('/parts/' + $routeParams.pid).success(function(data) {
                $scope.part = data;
                $scope.loadConfig();
            });
        } else {
            $scope.loadConfig();
        }

    }

    $scope.catChanged = function(index) {
        alert(index);
        var cc = pick_list.parts[index].picked_cat;
        alert(cc);
        $scope.parts_list = Parts.query({category:cc});
    };

    $scope.setupConfig = function() {

    }

    $scope.loadConfig = function() {
        $http.get('/configs').
        success(function(dd, status, headers, config) {
            $scope.config = dd;
            console.log(dd);
            $scope.setupConfig();

        }).
        error(function(data, status, headers, config) {
            // log error
        });
    }




    $scope.enableEditor = function() {
        $scope.editorEnabled = true;
    };

    $scope.disableEditor = function() {
        $scope.editorEnabled = false;
    };

    $scope.submit = function() {
        if ($scope.submit_type == 'PUT') {
            $http({
                method: 'PUT',
                url: '/parts/' + $scope.part._id,
                data: $scope.part
            });
        } else {
            $http({
                method: 'POST',
                url: '/parts',
                data: $scope.part
            });

        }
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
   /*     var uploadUrl = "/parts/image";
        fileUpload.uploadFileToUrl(file, uploadUrl);
        */
        $scope.disableEditor();
        $location.path('/parts.html/' + $scope.part._id);
    };


}]);
