'use strict';

/**
 * @ngdoc service
 * @name powerApp.commonService
 * @description
 * # commonService
 * Service in the powerApp.
 */
angular.module('powerApp')
  .service('CommonService',['$http','$q','AuthService','API_ENDPOINT',
    function ($http,$q,authService,API_ENDPOINT) {
  var _self = this;

  var init = function() {
    _self.userinfo = $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/getUserInfo', _self.user).then(function(result) {
        resolve(result.data);
      });
    });
  };
var wrapAuth = function(val){
  authService.loginStatus(val);
};

  var logout = function(){
    authService.logout();
  };

  var getUser = function() {return _self.user;};
  var setUser = function(u) {_self.user = u;};

  return {
    init: init,
    setUser: setUser,
    getUser: getUser,
    wrapAuth: wrapAuth,
    logout: logout
  };
}]);
