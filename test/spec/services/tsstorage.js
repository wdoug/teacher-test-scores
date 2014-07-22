'use strict';

describe('Service: tsStorage', function () {

  // load the service's module
  beforeEach(module('teacherTestScoresApp'));

  // instantiate service
  var tsStorage;
  beforeEach(inject(function (_tsStorage_) {
    tsStorage = _tsStorage_;
  }));

  it('should retreive localStorage data with .get()', function () {
    spyOn(localStorage, 'getItem');
    tsStorage.get();

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('should update localStorage data with .put()', function () {
    spyOn(localStorage, 'setItem');
    var fakeData = [{name: 'student', score: 75}];
    tsStorage.put(fakeData);

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('teacher-test', JSON.stringify(fakeData));
  });

  it('should strip $$hashKey from data before updating with .put()', function () {
    spyOn(localStorage, 'setItem');
    var fakeData = [{name: 'student', score: 75, $$hashKey: '005'}];
    tsStorage.put(fakeData);

    delete fakeData[0].$$hashKey;

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('teacher-test', JSON.stringify(fakeData));
  });
});
