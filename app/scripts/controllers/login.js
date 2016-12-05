
  'use strict';

  angular
  .module('Login', [])
  .controller('loginCtrl', ['$scope','$state','AuthService','CommonService',
    function($scope,$state,authService,commonService) {

  //  var remember = localStorageService.get('remember');
    $scope.login = {
      username: '',
      password: '',
      remember: false,
    };
  /*  if ( remember == 'X') {
      $scope.login.username = localStorageService.get('username');
      $scope.login.password = localStorageService.get('password');
      $scope.login.remember = true;
    }*/

    $scope.loginPost = function() {
      authService.login($scope.login).then(function(user) {
          commonService.init();
          commonService.setUser(user);
          $state.go('Main');
      }, function() {
    /*    var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: errMsg
        });*/
      });
    };

    $scope.clear = function() {
      $scope.login = {
        remember: false,
      };
    };


}]);
