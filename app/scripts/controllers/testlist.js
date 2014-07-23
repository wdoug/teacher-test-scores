'use strict';

/**
 * @ngdoc function
 * @name teacherTestScoresApp.controller:TestlistCtrl
 * @description
 * # TestlistCtrl
 * Controller of the teacherTestScoresApp
 */
angular.module('teacherTestScoresApp')
  .controller('TestlistCtrl', [
    '$scope',
    'testStorage',
    '$location',

    function ($scope, testStorage, $location) {
      $scope.tests = testStorage.getTests();
      $scope.addFailure = false;

      $scope.addTest = function (testName) {
        var testAdded = testStorage.addTest(testName);
        if (testAdded) {
          $location.url('/tests/'+testName);
        }
        else {
          $scope.addFailure = true;
        }
      };

      $scope.removeTest = function (index) {
        var testRemoved = testStorage.deleteTest($scope.tests[index]);
        if (testRemoved) {
          $scope.tests.splice(index, 1);
        }
      };
    }
  ]);
