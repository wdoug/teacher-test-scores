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
    '$routeParams',

    function ($scope, testStorage, $routeParams) {
      $scope.currentTest = $routeParams.testName;
      $scope.studentToAdd = {name:'', score:''};
      $scope.students = testStorage.getResults($scope.currentTest) || [];

      // Calculate and update test summary values
      $scope.setSummaryValues = function (students) {
        var sum = 0,
            count = 0,
            score,
            // @NOTE: Originally was using Number's positive and negative infinity
            // here, but Number.isFinite() is not well supported cross browser
            minScore = '',
            maxScore = '';

        angular.forEach(students, function (student) {
          score = parseFloat(student.score);
          sum += score || 0;

          // Only count actual numbers
          if ( !isNaN(score) ) {
            count += 1;

            if (minScore === '' || score < minScore) {
              minScore = score;
            }
            if (maxScore === '' || score > maxScore) {
              maxScore = score;
            }
          }
        });
        var avgScore = +(sum/count).toFixed(2);
        $scope.avgScore = (isNaN(avgScore))? '' : avgScore;
        $scope.minScore = minScore;
        $scope.maxScore = maxScore;
      };

      $scope.setSummaryValues($scope.students);

      $scope.$watch('students', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          testStorage.setResults($scope.currentTest, $scope.students);

          $scope.setSummaryValues(newValue);
        }
      }, true);

      $scope.addStudent = function () {
        $scope.students.unshift( angular.copy($scope.studentToAdd) );
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
