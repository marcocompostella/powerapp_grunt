'use strict';

/**
 * @ngdoc service
 * @name powerApp.commonService
 * @description
 * # commonService
 * Service in the powerApp.
 */
angular.module('powerApp')
  .service('CommonService', function ($http,$q,API_ENDPOINT) {
  var _self = this;

  var init = function (){};

  var getInfo = function(cB) {
    _self.userinfo.then(function(list){
      cB(list);
    });
  };

  var getUser = function() {
    return _self.user;
  };

  var setUser = function(u) {
    _self.user = u;
    _self.userinfo = $q(function(resolve, reject) {
      $http.post(API_ENDPOINT.url + '/getUserInfo', _self.user).then(function(result) {
        resolve(result.data);
      });
    });
  };

  return {
    init: init,
    setUser: setUser,
    getUser: getUser,
    getInfo: getInfo
  };
});
