'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('teacherTestScoresApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should initially have no students listed', function () {
    expect(scope.students.length).toBe(0);
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

    scope.removeStudent(0);
    expect(scope.students.length).toBe(1);
    expect(scope.students[0].name).toBe('Student 2');
  });
});
