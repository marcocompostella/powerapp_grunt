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
    $http.get(API_ENDPOINT.url + '/mobileInfo').then(function(result) {
      _self.userinfo = result.data.userInfo;
      authService.changeLoginStatus(true);

      trainingService.init(_self.userinfo.scheda);
    });
  };
  var wrapAuth = function(val){
    authService.setLoginStatus(val);
  };
  var logout = function(){
    authService.logout();
  };
  var changeState = function (state){
    //_self.menu.splice(0,_self.menu.length);
    _self.view.menus.forEach(function(e){
      if (e.state == state) {
        _self.view.menu = e.list;
      };
    });
  };
  var choseMonth = function(){
    trainingService.popMonth()
  };

  var win = function(msg){
  console.log("w: ",msg);
  };
  var fail = function(msg){
  console.log("l: ",msg);
  };
  var sendAvatar = function(fileURI,id){
    var options = new FileUploadOptions();
    var ft = new FileTransfer();
    var headers={'Authorization': authService.getHeaderAuth()};

    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;
    options.params = {userid:id}; // if we need to send parameters to the server request
    options.headers = headers;
    console.log(fileURI);
    ft.upload(fileURI, encodeURI(API_ENDPOINT.url + "/mobileUpPhoto"), win, fail, options);
  }


  var getUser = function() {return _self.user;};
  var setUser = function(u) {_self.user = u;};
  var setMenu = function(m) {_self.view = m;};

  return {
    init: init,
    setUser: setUser,
    getUser: getUser,
    setMenu: setMenu,
    wrapAuth: wrapAuth,
    sendAvatar: sendAvatar,
    changeState: changeState,
    choseMonth: choseMonth,
    logout: logout
  };
}]);
