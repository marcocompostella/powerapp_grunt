'use strict';

describe('Controller: EngageCtrl', function () {

  // load the controller's module
  beforeEach(module('powerApp'));

  var EngageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EngageCtrl = $controller('EngageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EngageCtrl.awesomeThings.length).toBe(3);
  });
});
