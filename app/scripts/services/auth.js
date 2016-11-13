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
    function ($rootScope,$http,$q,API_ENDPOINT,localStorageService) {
  var _self = this;
  var LOCAL_TOKEN_KEY = 'tokenKey';
  var isAuthenticated = false;
  var authToken;

  var view = {
    showBar: false,
    menu   : {}
  };



  function loadUserSetting() {
    var token = localStorageService.get(LOCAL_TOKEN_KEY);
    if (token) {
      loadUserCredentials(token);
    }
  }

  function loadUserCredentials(token){
    useCredentials(token);
    loadUserView();
  }

  function storeUserCredentials(token) {
    localStorageService.set(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
    loadUserView();
  }

  function useCredentials(token) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = authToken;
    view.showBar = true;
  }

  function loadUserView(){
        view.showBar = true;
        view.menu.sidemenu =[{
          icon:"dashboard",
          state:"Dashboard",
          nested: 'Main',
          type: 'l'
        },{
          icon:"directions_walk",
          state:"Training",
          nested: false,
          type: 'l'
        },{
          icon:"settings",
          state:"Setting",
          nested: false,
          type: 'l'
        },{
          icon:"logout",
          state:"Logout",
          action: "logout",
          type: 'f'
        }];

        _self.setView(view);
        _self.initController();
  }

  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    view.showBar = false;
    localStorageService.remove(LOCAL_TOKEN_KEY);
  }

  var login = function(user) {
    return $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/mobileAuth', user).then(function(result) {
        if (result.data.success) {
          storeUserCredentials(result.data.token);
          resolve(result.data.user);
        } else {
          reject(result.data.msg);
        }
      });
    });
  };

  var logout = function() {
    destroyUserCredentials();
            view.showBar = false;
            view.menu.sidemenu = {};
            view.menu.moremenu = {};
            _self.setView(view);
  };

  var init = function (cb1, cb2){
    _self.setView = cb1;
    _self.initController = cb2;
    loadUserSetting();
  };

  return {
    init: init,
    login: login,
    logout: logout,
    isAuthenticated: function() { return isAuthenticated; },
  };

}]);
