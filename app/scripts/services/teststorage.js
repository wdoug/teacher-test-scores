'use strict';

/**
 * @ngdoc service
 * @name teacherTestScoresApp.testStorage
 * @description
 * # testStorage
 * Service in the teacherTestScoresApp.
 */
angular.module('teacherTestScoresApp')
  .service('testStorage', function testStorage() {

    // Since there is currently only one test at any one time
    var testStorageId = 'teacher-test';

    return {
        get: function () {
            return JSON.parse(localStorage.getItem(testStorageId) || '[]');
        },
        put: function (students) {
            var stringifiedData = JSON.stringify(students, function(key, val) {
                if(key === '$$hashKey') {
                    return undefined;
                }
                return val;
            });
            localStorage.setItem(testStorageId, stringifiedData);
        }
    };
  });
