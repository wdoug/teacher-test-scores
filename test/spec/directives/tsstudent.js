'use strict';

describe('Directive: tsStudent', function () {

  // load the directive's module
  beforeEach(module('teacherTestScoresApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<ts-student></ts-student>');
    element = $compile(element)(scope);
  }));

  // @TODO: Decide how/what to test for this directive

});
