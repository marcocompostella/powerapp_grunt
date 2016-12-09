'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:TrainingCtrl
 * @description
 * # TrainingCtrl
 * Controller of the powerApp
 */
angular.module('Training', ['swipeLi'])
  .controller('trainingCtrl', ['$scope','TrainingService', function ($scope, trainingService) {

    var setScheda = function(l){
      list = l;
    };

    trainingService.bindScheda($scope);



        $scope.doInvert = false;

        $scope.done = function (item) {
          console.log('%s marked as accepted!', item);
          item.doInvert = true;
        };

        $scope.skip = function (item) {
          console.log('%s marked as rejected!', item);
          item.doInvert = true;
        };






  }]);
