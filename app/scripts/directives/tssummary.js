'use strict';

/**
 * @ngdoc directive
 * @name teacherTestScoresApp.directive:tsSummary
 * @description
 * # tsSummary
 */
angular.module('teacherTestScoresApp')
  .directive('tsSummary', function () {
    return {
      templateUrl: 'views/partials/summary.html',
      restrict: 'E'
    };
  });
