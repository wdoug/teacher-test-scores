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
    '$locationProvider',
    '$routeProvider',

    function ($locationProvider, $routeProvider) {
      // Requires backend running to have this work properly
      //$locationProvider.html5Mode(true);
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
