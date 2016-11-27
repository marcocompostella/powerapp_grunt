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
  /*      navigator.camera.getPicture(onCapturePhoto, onFail, {
            quality: 100,
            destinationType: destinationType.FILE_URI
        });*/




              writeFile0();
  //commonService.capture('images/male.png');

      };






      function writeFile0() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

         console.log('file system open: ' + fs.name);
         fs.root.getFile("newFile.txt", { create: true, exclusive: false }, function (fileEntry) {

             console.log("fileEntry is file?" + fileEntry.isFile.toString());
             writeFile(fileEntry, null);

         }, onErrorCreateFile);

     }, onErrorLoadFs);

     function onErrorCreateFile() {};
     function onErrorLoadFs() {};


     function writeFile(fileEntry, dataObj) {
         fileEntry.createWriter(function (fileWriter) {
             fileWriter.onwriteend = function() {
                 console.log("Successful file write...");
                 readFile(fileEntry);
             };

             fileWriter.onerror = function (e) {
                 console.log("Failed file write: " + e.toString());
             };

             // If data object is not passed in,
             // create a new Blob instead.
             if (!dataObj) {
                 dataObj = new Blob(['some file data test'], { type: 'text/plain' });
             }

             function readFile(fileEntry) {
               fileEntry.file(function (file) {
                     var reader = new FileReader();
                     reader.onloadend = function() {
                       console.log("Successful file fileEntry.fullPath: " + fileEntry.fullPath);
                         console.log("Successful file read: " + this.result);
                     };
                     reader.readAsText(file);
                 }, onErrorReadFile);

                      function onErrorReadFile() {};

             }

             fileWriter.write(dataObj);
         });

     }
}













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
