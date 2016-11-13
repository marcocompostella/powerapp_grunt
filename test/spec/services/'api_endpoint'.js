'use strict';

describe('Service: 'APIENDPOINT'', function () {

  // load the service's module
  beforeEach(module('powerApp'));

  // instantiate service
  var 'APIENDPOINT';
  beforeEach(inject(function (_'APIENDPOINT'_) {
    'APIENDPOINT' = _'APIENDPOINT'_;
  }));

  it('should do something', function () {
    expect(!!'APIENDPOINT').toBe(true);
  });

});
