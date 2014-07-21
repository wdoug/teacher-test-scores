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

    function ($scope) {
      $scope.studentToAdd = {name:'', score:''};
      $scope.students = [];

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
