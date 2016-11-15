'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the powerApp
 */
angular.module('Main',[])
  .controller('mainCtrl',['CommonService','trainingService',function (commonService,trainingService) {

    commonService.init();


  }]);
