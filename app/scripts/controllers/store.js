'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the powerApp
 */
angular.module('Store', [])
  .controller('storeCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
