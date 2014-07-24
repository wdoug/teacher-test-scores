'use strict';

describe('Service: testStorage', function () {

  // load the service's module
  beforeEach(module('teacherTestScoresApp'));

  // instantiate service
  var testStorage,
      testStorageId = 'unit-testing',
      testName = 'Test Name';

  beforeEach(inject(function (_testStorage_) {
    testStorage = _testStorage_;
    testStorage.WARNING_SET_STORAGE_ID(testStorageId);
    localStorage.setItem(testStorageId, '[]');
  }));

  // Make sure there aren't any remnants afterwards
  afterEach(function () {
    localStorage.removeItem(testStorageId);
  });

  it('should retreive a list of test names with .getTests()', function () {
    spyOn(localStorage, 'getItem');
    testStorage.getTests();

    expect(localStorage.getItem).toHaveBeenCalledWith(testStorageId);
  });

  it('should add a test with .addTest(testName)', function () {
    testStorage.addTest(testName);

    var localValue = JSON.parse(localStorage.getItem(testStorageId) || '[]');

    expect(localValue.length).toBe(1);
    expect(localValue[0]).toBe(testName);
  });

  it('should return false when trying to add the same test name twice', function () {
    testStorage.addTest(testName);
    var testAdded = testStorage.addTest(testName);

    expect(testAdded).toBe(false);
  });

  it('should return false when trying to add a test with the same name as the storage id', function () {
    var testAdded = testStorage.addTest(testStorageId);

    expect(testAdded).toBe(false);
  });

  it('should remove test with .deleteTest(testName)', function () {
    testStorage.addTest(testName);
    testStorage.deleteTest(testName);

    var localValue = JSON.parse(localStorage.getItem(testStorageId) || '[]');

    expect(localValue.length).toBe(0);
  });

  it('should return false if trying to remove a test that doesn\'t exists', function () {
    var testRemoved = testStorage.deleteTest(testName);

    expect(testRemoved).toBe(false);
  });

  it('should retreive test data with .get(test)', function () {
    testStorage.addTest(testName);
    spyOn(localStorage, 'getItem');
    testStorage.get(testName);

    expect(localStorage.getItem).toHaveBeenCalledWith(testName);
  });

  it('should update localStorage data with .put()', function () {
    spyOn(localStorage, 'setItem');
    var fakeData = [{name: 'student', score: 75}];
    testStorage.put(testName, fakeData);

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(testName, JSON.stringify(fakeData));
  });

  it('should strip $$hashKey from data before updating with .put()', function () {
    spyOn(localStorage, 'setItem');
    var fakeData = [{name: 'student', score: 75, $$hashKey: '005'}];
    testStorage.put(testName, fakeData);

    delete fakeData[0].$$hashKey;

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(testName, JSON.stringify(fakeData));
  });

  it('should remove associated test data when removing a test', function () {
    testStorage.addTest(testName);
    var fakeData = [{name: 'student', score: 75}];
    testStorage.put(testName, fakeData);

    testStorage.deleteTest(testName);

    var testAssociatedData = JSON.parse(localStorage.getItem(testName) || '[]');

    expect(testAssociatedData.length).toBe(0);
  });
});
