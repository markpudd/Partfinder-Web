'use strict';

describe('StoresControllerTest', function() {


  beforeEach(module('partFinderApp'));
  beforeEach(module('storesService'));

  var scope,ctrl,$httpBackend, routeParams ;

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $routeParams ) {
      $httpBackend = _$httpBackend_;

      routeParams = $routeParams;

      scope = $rootScope.$new();
      ctrl = $controller('StoresController', {$scope: scope});
  }));

  it('STORES STUB TEST', function() {
  });

});
