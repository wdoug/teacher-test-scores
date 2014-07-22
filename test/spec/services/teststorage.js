'use strict';

describe('Service: testStorage', function () {

  // load the service's module
  beforeEach(module('teacherTestScoresApp'));

  // instantiate service
  var testStorage;
  beforeEach(inject(function (_testStorage_) {
    testStorage = _testStorage_;
  }));

  it('should retreive localStorage data with .get()', function () {
    spyOn(localStorage, 'getItem');
    testStorage.get();

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('should update localStorage data with .put()', function () {
    spyOn(localStorage, 'setItem');
    var fakeData = [{name: 'student', score: 75}];
    testStorage.put(fakeData);

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('teacher-test', JSON.stringify(fakeData));
  });

  it('should strip $$hashKey from data before updating with .put()', function () {
    spyOn(localStorage, 'setItem');
    var fakeData = [{name: 'student', score: 75, $$hashKey: '005'}];
    testStorage.put(fakeData);

    delete fakeData[0].$$hashKey;

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('teacher-test', JSON.stringify(fakeData));
  });
});
