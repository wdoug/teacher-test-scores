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
      // Calculate and update test summary values
      $scope.setSummaryValues = function (students) {
        var sum = 0,
            count = 0,
            score,
            minScore = Number.POSITIVE_INFINITY,
            maxScore = Number.NEGATIVE_INFINITY;

        angular.forEach(students, function (student) {
          score = parseFloat(student.score);
          sum += score || 0;

          // Only count actual numbers
          if ( !isNaN(score) ) {
            count += 1;

            if (student.score < minScore) {
              minScore = student.score;
            }
            if (student.score > maxScore) {
              maxScore = student.score;
            }
          }
        });
        $scope.avgScore = sum/count;
        $scope.minScore = minScore;
        $scope.maxScore = maxScore;
      };

      $scope.studentToAdd = {name:'', score:''};
      $scope.students = testStorage.get() || [];

      $scope.setSummaryValues($scope.students);

      $scope.$watch('students', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          testStorage.put($scope.students);

          $scope.setSummaryValues(newValue);
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
