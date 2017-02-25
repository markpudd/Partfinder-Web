'use strict';

describe('ConfigsControllerTest', function() {


  beforeEach(module('partFinderApp'));
  beforeEach(module('configsService'));

  var scope,ctrl,$httpBackend, routeParams ;

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $routeParams ) {
      $httpBackend = _$httpBackend_;

      routeParams = $routeParams;

      scope = $rootScope.$new();
      ctrl = $controller('ConfigsController', {$scope: scope});
  }));

  it('CONFIG STUB TEST', function() {
  });

});
