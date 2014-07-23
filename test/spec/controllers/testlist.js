'use strict';

describe('Controller: TestlistCtrl', function () {

  // load the controller's module
  beforeEach(module('teacherTestScoresApp'));

  var TestlistCtrl,
    scope,
    testStorage,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _testStorage_, $location) {
    scope = $rootScope.$new();
    testStorage = _testStorage_;
    location = $location;

    spyOn(testStorage, 'getTests');

    TestlistCtrl = $controller('TestlistCtrl', {
      $scope: scope,
      testStorage: testStorage,
      $location: location
    });
  }));

  it('should load tests from testStorage service', function () {
    expect(testStorage.getTests).toHaveBeenCalled();
  });

  it('should route to /tests/:testName after successfully adding a test', function () {
    var testName = 'A test';
    spyOn(testStorage, 'addTest');
    scope.addTest(testName);

    expect(testStorage.addTest).toHaveBeenCalledWith(testName);
  });

  it('should route to /tests/:testName after successfully adding a test', function () {
    var testName = 'test';
    spyOn(testStorage, 'addTest').and.returnValue(true);
    scope.addTest(testName);

    scope.$apply();

    expect(location.path()).toBe('/tests/test');
  });
});
