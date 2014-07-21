'use strict';

/**
 * @ngdoc directive
 * @name teacherTestScoresApp.directive:tsStudent
 * @description
 * # tsStudent
 */
angular.module('teacherTestScoresApp')
  .directive('tsStudent', function () {
    return {
      templateUrl: 'views/partials/student.html',
      restrict: 'E'
    };
  });
