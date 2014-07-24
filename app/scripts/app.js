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
      $locationProvider.html5Mode(true);
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
