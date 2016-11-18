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
    $http.post(API_ENDPOINT.url + '/mobileInfo', _self.user).then(function(result) {
      _self.userinfo = result.data.userInfo;

      var promise = $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/mobileScheda', _self.userinfo.scheda[0]).then(function(result) {
          if (result.data.success) {
            resolve(result.data.scheda);
          } else {
            reject();
          }
        });
      });
      trainingService.init(promise,_self.userinfo.scheda);
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
