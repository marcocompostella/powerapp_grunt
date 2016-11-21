'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:TrainingCtrl
 * @description
 * # TrainingCtrl
 * Controller of the powerApp
 */
angular.module('Training', [])
  .controller('trainingCtrl', ['$scope','TrainingService', function ($scope, trainingService) {

    var setScheda = function(l){
      list = l;
    };

    trainingService.bindScheda($scope);



  }]);
