'use strict';

/**
 * @ngdoc service
 * @name powerApp.commonService
 * @description
 * # commonService
 * Service in the powerApp.
 */
angular.module('powerApp')
  .service('CommonService',['$http','$q','CordovaService',
            'AuthService','TrainingService',
            'API_ENDPOINT',
    function ($http,$q,cordovaService,authService,trainingService,API_ENDPOINT) {
  var _self = this;
  _self.start = false;

  function getPromisePhoto(){
    return $http.get(API_ENDPOINT.url + '/mobilePhoto');
  };

  var init = function() {
    _self.start = true;
    $http.get(API_ENDPOINT.url + '/mobileInfo').then(function(result) {
      _self.userinfo = result.data.userInfo;
      authService.changeLoginStatus(true);
      getPromisePhoto().then(function(res) {
        _self.photo = res.data.img;
      });
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





    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    cordovaService.ready.then(function () {
      window.plugins.OneSignal
        .startInit("cd0dc958-90b1-437b-8ff5-09d6211a1a70", "949075032282")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    });













  var getUser = function() {return _self.user;};
  var getPhoto = function() {return _self.photo;};
  var setUser = function(u) {_self.user = u;};
  var setMenu = function(m) {_self.view = m;};
  var isStart = function() {return _self.start};

  return {
    init: init,
    isStart: isStart,
    setMenu: setMenu,
    setUser: setUser,
    getUser: getUser,
    getPhoto: getPhoto,
    wrapAuth: wrapAuth,
    sendAvatar: sendAvatar,
    changeState: changeState,
    choseMonth: choseMonth,
    logout: logout
  };
}]);
