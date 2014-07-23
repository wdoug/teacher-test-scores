'use strict';
/**
 * @ngdoc overview
 * @name teacherTestScoresApp
 * @description
 * # teacherTestScoresApp
 *
 * Main module of the application.
 */
angular
  .module('teacherTestScoresApp', [
    'ngRoute'
  ])
  .config([
    '$routeProvider',

    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/testlist.html',
          controller: 'TestlistCtrl'
        })
        .when('/tests/:testName', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
