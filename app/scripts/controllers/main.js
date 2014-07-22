'use strict';

/**
 * @ngdoc function
 * @name teacherTestScoresApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the teacherTestScoresApp
 */
angular.module('teacherTestScoresApp')
  .controller('MainCtrl', [
    '$scope',
    'testStorage',

    function ($scope, testStorage) {
      $scope.studentToAdd = {name:'', score:''};
      $scope.students = testStorage.get() || [];

      $scope.$watch('students', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          testStorage.put($scope.students);
        }
      }, true);

      $scope.addStudent = function () {
        $scope.students.push( angular.copy($scope.studentToAdd) );
        $scope.studentToAdd.name = '';
        $scope.studentToAdd.score = '';
      };

      $scope.removeStudent = function (index) {
        $scope.students.splice(index, 1);
      };

      $scope.removeAll = function () {
        // @TODO: Prompt the user with a warning first
        $scope.students = [];
      };

    }
  ]);
