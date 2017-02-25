'use strict';

describe('PickListControllerTest', function() {


  beforeEach(module('partFinderApp'));
  beforeEach(module('pickListsService'));

  var scope,ctrl,$httpBackend, routeParams ;

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $routeParams ) {
      $httpBackend = _$httpBackend_;

      routeParams = $routeParams;

      scope = $rootScope.$new();
      ctrl = $controller('PickListsController', {$scope: scope});
  }));

  it('PICK LIST STUB TEST', function() {
  });

});
