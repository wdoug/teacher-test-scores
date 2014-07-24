'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('teacherTestScoresApp'));

  var MainCtrl,
    scope,
    testStorage,
    routeParams = {testName: 'testName'};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _testStorage_) {
    testStorage = _testStorage_;
    scope = $rootScope.$new();
    spyOn(testStorage, 'getResults');
    spyOn(testStorage, 'setResults');

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      testStorage: testStorage,
      $routeParams : routeParams
    });
  }));

  it('should load test data from testStorage service', function () {
    expect(testStorage.getResults).toHaveBeenCalled();
  });

  it('should initially have an empty \'studentToAdd\'', function () {
    expect(scope.studentToAdd.name).toBe('');
    expect(scope.studentToAdd.score).toBe('');
  });

  it('should allow adding students from \'studentToAdd\'', function () {
    expect(scope.students.length).toBe(0);
    scope.studentToAdd = {name: 'A test name', score: 72};
    scope.addStudent();

    expect(scope.students.length).toBe(1);
    expect(scope.students[0].name).toBe('A test name');
  });

  it('should persist changes to students with testStorage', function () {
    scope.studentToAdd = {name: 'A test name', score: 72};

     // Wrapping in $apply() calls is used to make sure $watch
     // is called with two different values.
    scope.$apply();
    scope.addStudent();
    scope.$apply();

    expect(testStorage.setResults).toHaveBeenCalledWith(routeParams.testName, scope.students);
  });

  it('should reset \'studentToAdd\' after adding them the student', function () {
    scope.studentToAdd = {name: 'A test name', score: 72};
    scope.addStudent();
    expect(scope.studentToAdd.name).toBe('');
    expect(scope.studentToAdd.score).toBe('');
  });

  it('should allow individual students to be removed', function () {
    scope.studentToAdd = {name: 'Student 1', score: 1};
    scope.addStudent();
    scope.studentToAdd = {name: 'Student 2', score: 2};
    scope.addStudent();
    expect(scope.students.length).toBe(2);

    // Since the students are added to front of array
    // student 0 is 'Student 2'
    scope.removeStudent(0);
    expect(scope.students.length).toBe(1);
    expect(scope.students[0].name).toBe('Student 1');
  });

  it('should provide average, min, and max, student scores', function () {
    scope.$apply();
    scope.students = [{name: 'A', score: 50},
                      {name: 'B', score: 100}];
    scope.$apply();
    expect(scope.avgScore).toBe(75);
    expect(scope.minScore).toBe(50);
    expect(scope.maxScore).toBe(100);

    scope.students.push({name: 'C', score: 45});
    scope.$apply();
    expect(scope.avgScore).toBe(65);
    expect(scope.minScore).toBe(45);
    expect(scope.maxScore).toBe(100);
  });
});
