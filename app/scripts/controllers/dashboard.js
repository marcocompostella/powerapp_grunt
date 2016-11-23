'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the powerApp
 */
angular.module('Dashboard', ['ngRateIt'])
  .controller('dashCtrl', ['$scope','$state','CordovaService', 'CommonService','TraininService',
    function ($scope,$state,cordovaService, commonService, traininService) {
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




      var retries = 0;
      function onCapturePhoto(fileURI) {
          var win = function (r) {
              clearCache();
              retries = 0;
              console.log('Done!');
          }

          var fail = function (error) {
              if (retries == 0) {
                  retries ++
                  setTimeout(function() {
                      onCapturePhoto(fileURI)
                  }, 1000)
              } else {
                  retries = 0;
                  clearCache();
                  console.log('Ups. Something wrong happens!');
              }
          }

          var options = new FileUploadOptions();
          options.fileKey = "file";
          options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
          options.mimeType = "image/jpeg";
          options.params = {}; // if we need to send parameters to the server request
          var ft = new FileTransfer();
          ft.upload(fileURI, encodeURI("http://host/upload"), win, fail, options);
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
