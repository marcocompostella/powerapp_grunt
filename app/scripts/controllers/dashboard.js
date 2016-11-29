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

      var logOb;
      $scope.getPicture = function(){
  /*      navigator.camera.getPicture(onCapturePhoto, onFail, {
            quality: 100,
            destinationType: destinationType.FILE_URI
        });*/
  //commonService.capture(cordova.file.dataDirectory+"/log.txt");
  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
         console.log("got main dir",dir);
         dir.getFile("log.txt", {create:true}, function(file) {
             console.log("got the file", file);
             logOb = file;
             writeLog("App started");
         });
     });
      };

      $scope.send = function(){
commonService.capture(cordova.file.dataDirectory+"/log.txt");
      };




      $scope.read = function(){
        console.log('path:');
        console.log(cordova.file.dataDirectory);
       window.resolveLocalFileSystemURL(cordova.file.dataDirectory + "/log.txt", gotFile, fail);
      };

function gotFile(fileEntry) {
    fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
            console.log("Text is: ",e);
        }
        reader.readAsText(file);
    });
};



            function writeLog(str) {
                if(!logOb) return;
                var log = str + " [" + (new Date()) + "]\n";
                console.log("going to log "+log);
                logOb.createWriter(function(fileWriter) {
                    fileWriter.seek(fileWriter.length);
                    var blob = new Blob([log], {type:'text/plain'});
                    fileWriter.write(blob);
                    console.log("ok, in theory i worked");
                }, fail);
            };
            function fail(e) {
             console.log("FileSystem Error");
             console.dir(e);
           };



      cordovaService.ready.then(function () {
            pictureSource = navigator.camera.PictureSourceType;
            destinationType = navigator.camera.DestinationType;
      });

      $scope.startTraining = function(){
        $state.go('Training');
      };



}]);
