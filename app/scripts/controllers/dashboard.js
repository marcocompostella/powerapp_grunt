'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the powerApp
 */
angular.module('Dashboard', ['ngRateIt'])
  .controller('dashCtrl', ['$scope','$state','CordovaService', 'CommonService',
    function ($scope,$state,cordovaService, commonService) {
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

      $scope.getPicture = function(){
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URI });
        };
      function onSuccess(imageURI) {
          var image = document.getElementById('myImage');
          image.src = imageURI;
      }
      function onFail(message) {
        console.log(message);
        //          alert('Failed because: ' + message);
      }
      cordovaService.ready.then(function () {
        console.log("ok");
      //  alert('Cordova is ready');
      });

      $scope.startTraining = function(){
        $state.go('Training');
      };



}]);
