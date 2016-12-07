'use strict';

/**
 * @ngdoc service
 * @name powerApp.authService
 * @description
 * # authService
 * Service in the powerApp.
 */
angular.module('powerApp')
  .service('AuthService', ['$rootScope','$http','$q','API_ENDPOINT','localStorageService',
    function ($rootScope,$http,$q,
              API_ENDPOINT,
              localStorageService) {
  var _self = this;

  var LOCAL_TOKEN_KEY = 'tokenKey';
  var isAuthenticated = false;
  var authToken;

  function loadUserSetting() {
    var token = localStorageService.get(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }


  function storeUserCredentials(token) {
    localStorageService.set(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    localStorageService.remove(LOCAL_TOKEN_KEY);
  }

  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/mobileAuth', user).then(function(result) {
        if (result.data.success) {
          isAuthenticated = true;
          _self.view.isLogged = true;
          storeUserCredentials(result.data.token);
          resolve(result.data.user);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };
  var setloginStatus = function(v){
    _self.view = v;
  };
  var changeLoginStatus = function(v){
    _self.view.isLogged = v;
  };

  var logout = function() {
    _self.view.isLogged = false;
    destroyUserCredentials();
  };

  var getHeaderAuth = function(){
    return authToken;
  }

  loadUserSetting(  );

  return {
    setLoginStatus: setloginStatus,
    changeLoginStatus: changeLoginStatus,
    login: login,
    logout: logout,
    getHeaderAuth: getHeaderAuth,
    isAuthenticated: function() {
       return isAuthenticated;
     },
  };

}]);
