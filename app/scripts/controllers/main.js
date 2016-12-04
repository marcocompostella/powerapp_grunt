'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the powerApp
 */
angular.module('Main',[])
  .controller('mainCtrl',['CommonService',function (commonService) {

//inizializzo common : training
  if (!commonService.isStart())
    commonService.init();


  }]);
