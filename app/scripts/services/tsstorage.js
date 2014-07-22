'use strict';

/**
 * @ngdoc service
 * @name teacherTestScoresApp.tsStorage
 * @description
 * # tsStorage
 * Service in the teacherTestScoresApp.
 */
angular.module('teacherTestScoresApp')
  .service('tsStorage', function tsStorage() {

    // Since there is currently only one test at any one time
    var tsStorageId = 'teacher-test';

    return {
        get: function () {
            return JSON.parse(localStorage.getItem(tsStorageId) || '[]');
        },
        put: function (students) {
            var stringifiedData = JSON.stringify(students, function(key, val) {
                if(key === '$$hashKey') {
                    return undefined;
                }
                return val;
            });
            localStorage.setItem(tsStorageId, stringifiedData);
        }
    };
  });
