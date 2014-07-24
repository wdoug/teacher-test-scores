'use strict';

/**
 * @ngdoc service
 * @name teacherTestScoresApp.testStorage
 * @description Simple service for persisting data to localStorage
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
            // Check to make sure the test won't be a duplicate
            tests = getTests();
            for (var i = 0, len = tests.length; i < len; ++i) {
                if (newTestKey === tests[i]) {
                    // Unsuccessful addition
                    return false;
                }
            }
            // Add the test
            tests.push(newTestKey);
            localStorage.setItem(testStorageId, JSON.stringify(tests));
            return true;
        },

        deleteTest: function (testToDeleteKey) {
            // Find the test and remove it
            tests = getTests();
            for (var i = 0, len = tests.length; i < len; ++i) {
                if (testToDeleteKey === tests[i]) {
                    tests.splice(i, 1);
                    // Redefine the tests with the test removed
                    localStorage.setItem(testStorageId, JSON.stringify(tests));

                    // Remove associated results data
                    localStorage.removeItem(testToDeleteKey);
                    // Successful
                    return true;
                }
            }
            // Couldn't find the matching test
            return false;
        },

        // Get the results for a specific test
        getResults: function (testKey) {
            if (!testKey || testKey === testStorageId) {
                // Not allowed
                return false;
            }
            return JSON.parse(localStorage.getItem(testKey) || '[]');
        },

        // Set the results for a specific test
        setResults: function (testKey, students) {
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

        // Set the key for the test names (entry point reference for data)
        // Useful for testing
        // If there is a way to define this variable when the service is defined,
        // that would potentially reduce the risk misusing this power
        WARNING_SET_STORAGE_ID: function (id) {
            testStorageId = id;
        }
    };
  });
