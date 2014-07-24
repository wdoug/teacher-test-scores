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

    // Default namespace for tests
    var testStorageId = 'teacher-test-storage-id',
        tests;

    function getTests() {
        return JSON.parse(localStorage.getItem(testStorageId) || '[]');
    }

    return {
        getTests: getTests,
        addTest: function (newTestKey) {
            // Block the user from adding a test with the same name as the
            // storage id since that would break data
            if (newTestKey === testStorageId) {
                return false;
            }
            tests = getTests();
            for (var i = 0, len = tests.length; i < len; ++i) {
                if (newTestKey === tests[i]) {
                    return false;
                }
            }
            tests.push(newTestKey);
            localStorage.setItem(testStorageId, JSON.stringify(tests));
            return true;
        },
        deleteTest: function (testToDeleteKey) {
            tests = getTests();
            for (var i = 0, len = tests.length; i < len; ++i) {
                if (testToDeleteKey === tests[i]) {
                    tests.splice(i, 1);
                    localStorage.setItem(testStorageId, JSON.stringify(tests));
                    localStorage.removeItem(testToDeleteKey);
                    return true;
                }
            }
            return false;
        },
        get: function (testKey) {
            if (!testKey || testKey === testStorageId) {
                // Not allowed
                return false;
            }
            return JSON.parse(localStorage.getItem(testKey) || '[]');
        },
        put: function (testKey, students) {
            if (testKey === testStorageId) {
                // Not allowed
                return false;
            }
            var stringifiedData = JSON.stringify(students, function(key, val) {
                if(key === '$$hashKey') {
                    return undefined;
                }
                return val;
            });
            localStorage.setItem(testKey, stringifiedData);
        },
        // Useful for testing
        // I feel like there is a better way to do this, but I haven't
        // found it yet
        WARNING_SET_STORAGE_ID: function (id) {
            testStorageId = id;
        }
    };
  });
