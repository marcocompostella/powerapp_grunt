'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the powerApp
 */
angular.module('Dashboard', ['ngRateIt'])
  .controller('dashCtrl', ['$scope','$state','CordovaService', 'CommonService','TrainingService',
    function ($scope,$state,cordovaService, commonService, trainingService) {
      $scope.model = {
          basic: 0,
          readonly: 2.5,
          readonly_enables: true,
          minMaxStep:6,
          minMaxStep2:8.75,
          pristine: 3,
          resetable: 4,
          heightWidth: 1.5,
          callbacks: 5,
          custom: 4,
      };
      $scope.user = commonService.getUser();
      var pictureSource;   // picture source
      var destinationType; // sets the format of returned value

      function clearCache() {
          navigator.camera.cleanup();
      }


      function onCapturePhoto(fileURI) {
        commonService.capture(fileURI).then(function(result){
          clearCache();
        });
      }

      $scope.getPicture = function(){
        navigator.camera.getPicture(onCapturePhoto, onFail, {
            quality: 100,
            destinationType: destinationType.FILE_URI
        });
      };

     function onFail(message) {
       console.log('Failed because: ' + message);
     }

      cordovaService.ready.then(function () {

            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;

      });

      $scope.startTraining = function(){
        $state.go('Training');
      };



}]);
