'use strict';

describe('Service: cordovaService', function () {

  // load the service's module
  beforeEach(module('powerApp'));

  // instantiate service
  var cordovaService;
  beforeEach(inject(function (_cordovaService_) {
    cordovaService = _cordovaService_;
  }));

  it('should do something', function () {
    expect(!!cordovaService).toBe(true);
  });

});
