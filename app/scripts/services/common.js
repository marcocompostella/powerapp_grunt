'use strict';

/**
 * @ngdoc service
 * @name powerApp.commonService
 * @description
 * # commonService
 * Service in the powerApp.
 */
angular.module('powerApp')
  .service('CommonService',['$http','$q',
  'AuthService','TrainingService',
  'API_ENDPOINT',
    function ($http,$q,authService,trainingService,API_ENDPOINT) {
  var _self = this;

  var init = function() {
      $http.post(API_ENDPOINT.url + '/getUserInfo', _self.user).then(function(result) {
        _self.userinfo = result;
        trainingService.init(result.scheda);
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
