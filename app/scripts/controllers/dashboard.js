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

      var changePhoto = function (newPhoto){$scope.avatar = newPhoto;};
      commonService.setPhoto(changePhoto);

      var pictureSource;   // picture source
      var destinationType; // sets the format of returned value
      var camera;

      function clearCache() {
          navigator.camera.cleanup();
      }

      function onCapturePhoto(fileURI) {
        commonService.sendAvatar(fileURI, $scope.user._id).then(function(result){
          clearCache();
        });
      }
      function onFail(e) {
         console.log("FileSystem Error");
         console.dir(e);
      };

      $scope.getPicture = function(){
        navigator.camera.getPicture(onCapturePhoto, onFail, {
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
          encodingType: Camera.EncodingType.JPEG,     // 0=JPG 1=PNG
        });
      };

      $scope.send = function(){
        var file = cordova.file.externalDataDirectory + 'test.jpg';
        commonService.sendAvatar(file, $scope.user._id);
      };

      $scope.read = function(){
        console.log('path:');
        console.log(cordova.file.dataDirectory);
       window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "/log.txt", gotFile, fail);
      };

      cordovaService.ready.then(function () {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
        camera = navigator.camera;
      });

      $scope.startTraining = function(){
        $state.go('Training');
      };


      commonService.start('Dashboard');

}]);
