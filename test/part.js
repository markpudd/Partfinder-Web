'use strict';

describe('PartsControllerTest', function() {


  beforeEach(module('partFinderApp'));
  beforeEach(module('partsService'));

  var scope,ctrl,$httpBackend, routeParams ;

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $routeParams ) {
      $httpBackend = _$httpBackend_;
      var mockCategories = ['Category1', 'Category2'];
      var mockParts = [{"_id":"123",
                        "category":"Bricks",
                        "image":"123.png",
                        "description":"Brick 1 x 1",
                        "sub_parts":
                            [{"colour":"*",
                              "quantity":0,
                              "location":{"place_id":1,
                                          "store_id":"aaa"}
                              }
                            ]
                        }];

      $httpBackend.expectGET('parts/categories')
            .respond(mockCategories);
      $httpBackend.expectGET('parts')
            .respond(mockParts);

      routeParams = $routeParams;

      scope = $rootScope.$new();
      ctrl = $controller('PartsController', {$scope: scope});
  }));

  it('should getting categories', function() {
    jasmine.addCustomEqualityTester(angular.equals);
    expect(scope.categories).toEqual([]);
    $httpBackend.flush();
    expect(scope.categories).toEqual(['Category1', 'Category2']);
  });

  it('should getting parts', function() {
    jasmine.addCustomEqualityTester(angular.equals);
    expect(scope.parts).toEqual([]);
    $httpBackend.flush();
    expect(scope.parts).toEqual([{"_id":"123",
                      "category":"Bricks",
                      "image":"123.png",
                      "description":"Brick 1 x 1",
                      "sub_parts":
                          [{"colour":"*",
                            "quantity":0,
                            "location":{"place_id":1,
                                        "store_id":"aaa"}
                            }
                          ]
                      }]);
  });

  it('should change category selected', function() {
    //expect(scope.categorySelected).toEqual([]);
    routeParams.category = 'Bricks';
    $httpBackend.flush();
    expect(scope.categorySelected).toBe('Bricks');

  });
});
