"use strict";function DialogController(a,b,c){var d=!0;a.list=c.schede.map(function(a){return a.data}),a.indx=c.index,a.$watch("indx",function(c,e){return 1==d?void(d=!1):void b.hide(a.indx)})}angular.module("powerApp",["ui.router","ngAnimate","ngAria","ngMaterial","ngMessages","ngSanitize","ngTouch","ngMdIcons","LocalStorageModule","Login","Main","Dashboard","Engage","Payment","Setting","Training","Store"]).run(["$rootScope","$state","AuthService","CommonService",function(a,b,c,d){a.$on("$stateChangeStart",function(a,e,f,g,h){c.isAuthenticated()?d.changeState(e.name):"Login"!==e.name&&(a.preventDefault(),b.go("Login"))})}]),angular.module("powerApp").constant("API_ENDPOINT",{url:"http://powerhero.cloudno.de"}).constant("AUTH_EVENTS",{notAuthenticated:"auth-not-authenticated"}).constant("SIDEMENU",[{icon:"dashboard",state:"Dashboard",nested:"Main",type:"l"},{icon:"directions_walk",state:"Training",nested:!1,type:"l"},{icon:"settings",state:"Setting",nested:!1,type:"l"},{icon:"logout",state:"Logout",action:"logout",type:"f"}]).constant("MENU",[{state:"Main",list:[{icon:"settings",label:"Setting"},{icon:"logout",label:"Logout"}]},{state:"Training",list:[{icon:"today",state:"Training",funct:"selMon",label:"Select Month"}]},{state:"Setting",list:[{icon:"logout",label:"Logout"}]}]),angular.module("powerApp").config(["localStorageServiceProvider","$mdThemingProvider","$stateProvider","$urlRouterProvider","$mdDateLocaleProvider","$httpProvider",function(a,b,c,d,e,f){e.formatDate=function(a){return moment(a).format("DD-MM-YYYY")},b.theme("default").primaryPalette("grey").accentPalette("red"),f.interceptors.push("AuthInterceptor"),d.otherwise("/main"),c.state("Main",{url:"/main",views:{"":{templateUrl:"views/main.html",controller:"mainCtrl",controllerAs:"vm"},"Dashboard@Main":{templateUrl:"views/dashboard.html",controller:"dashCtrl",controllerAs:"vm"},"Engage@Main":{templateUrl:"views/engage.html",controller:"engageCtrl",controllerAs:"vm"},"Payment@Main":{templateUrl:"views/payment.html",controller:"paymentCtrl",controllerAs:"vm"}}}).state("Login",{url:"/login",templateUrl:"views/login.html",controller:"loginCtrl"}).state("Setting",{url:"/setting",templateUrl:"views/setting.html",controller:"settingCtrl"}).state("Store",{url:"/store",templateUrl:"views/store.html",controller:"storeCtrl"}).state("Training",{url:"/training",templateUrl:"views/training.html",controller:"trainingCtrl"})}]),angular.module("powerApp").service("CordovaService",["$q","$window",function(a,b){var c=a.defer();this.ready=c.promise,document.addEventListener("deviceready",function(){c.resolve(b.cordova)})}]),angular.module("powerApp").factory("AuthInterceptor",["$rootScope","$q","AUTH_EVENTS",function(a,b,c){return{responseError:function(d){return a.$broadcast({401:c.notAuthenticated}[d.status],d),b.reject(d)}}}]),angular.module("powerApp").service("CommonService",["$http","$q","AuthService","TrainingService","API_ENDPOINT",function(a,b,c,d,e){function f(a,b,c){a.getFile(b,{create:!0,exclusive:!1},function(a){g(a,null,c)},onErrorCreateFile)}function g(a,b){a.createWriter(function(c){c.onwriteend=function(){console.log("Successful file write..."),readFile(a)},c.onerror=function(a){console.log("Failed file write: "+a.toString())},b||(b=new Blob(["some file data"],{type:"text/plain"})),c.write(b)})}var h=this,i=function(){a.get(e.url+"/mobileInfo").then(function(a){h.userinfo=a.data.userInfo,c.changeLoginStatus(!0),d.init(h.userinfo.scheda)})},j=function(a){c.setLoginStatus(a)},k=function(){c.logout()},l=function(a){h.view.menus.forEach(function(b){b.state==a&&(h.view.menu=b.list)})},m=function(){d.popMonth()},n=function(a){console.log("w: ",a)},o=function(a){console.log("l: ",a)},p=function(a){var b=new FileUploadOptions,d=new FileTransfer,f={Authorization:c.getHeaderAuth()};b.fileKey="file",b.fileName=a.substr(a.lastIndexOf("/")+1),b.mimeType="image/jpeg",b.chunkedMode=!0,b.params={},b.headers=f,console.log(a),d.upload(a,encodeURI(e.url+"/mobileUpPhoto"),n,o,b)};window.requestFileSystem(window.TEMPORARY,5242880,function(a){console.log("file system open: "+a.name),f(a.root,"newTempFile.txt",!1)},onErrorLoadFs);var q=function(){return h.user},r=function(a){h.user=a},s=function(a){h.view=a};return{init:i,setUser:r,getUser:q,setMenu:s,capture:p,wrapAuth:j,changeState:l,choseMonth:m,logout:k}}]),angular.module("powerApp").service("AuthService",["$rootScope","$http","$q","API_ENDPOINT","localStorageService",function(a,b,c,d,e){function f(){var a=e.get(l);a&&h(a)}function g(a){e.set(l,a),h(a)}function h(a){m=!0,j=a,b.defaults.headers.common.Authorization=j}function i(){j=void 0,m=!1,b.defaults.headers.common.Authorization=void 0,e.remove(l)}var j,k=this,l="tokenKey",m=!1,n=function(a){return c(function(c,e){b.post(d.url+"/mobileAuth",a).then(function(a){a.data.success?(k.view.isLogged=!0,g(a.data.token),c(a.data.user)):e(a.data.msg)})})},o=function(a){k.view=a},p=function(a){k.view.isLogged=a},q=function(){k.view.isLogged=!1,i()},r=function(){return j};return f(),{setLoginStatus:o,changeLoginStatus:p,login:n,logout:q,getHeaderAuth:r,isAuthenticated:function(){return m}}}]),angular.module("powerApp").service("TrainingService",["$q","$http","$mdDialog","API_ENDPOINT",function(a,b,c,d){var e=this,f=function(a){e.schede=a,e.index=0,g(a[a.length-1]).then(function(a){e.scheda=a})},g=function(c){return a(function(a,e){b.post(d.url+"/mobileScheda",c).then(function(b){b.data.success?a(b.data.scheda):e()})})},h=function(a){e.view=a,a.scheda=e.scheda},i=function(){c.show({clickOutsideToClose:!1,fullscreen:!1,parent:angular.element(document.body),templateUrl:"views/dialogMonth.html",controller:DialogController,resolve:{training:function(){return{schede:e.schede,index:e.index}}}}).then(function(a){g(e.schede[a]).then(function(b){e.index=a,e.view.scheda=b})},function(){})};return{init:f,bindScheda:h,popMonth:i}}]),DialogController.$inject=["$scope","$mdDialog","training"],angular.module("powerApp").controller("appCtrl",["$scope","$mdSidenav","$state","CommonService","AUTH_EVENTS","SIDEMENU","MENU",function(a,b,c,d,e,f,g){function h(){b("left").toggle()}function i(){window.history.back()}function j(a){k.selected=a;var b=a.state;if("l"===a.type)a.nested!==!1&&(b=a.nested),c.go(b);else if("f"===a.type)switch(a.action){case"logout":k.logout()}}var k=this;a.view={sidemenu:f,menus:g,isLogged:!1},d.wrapAuth(a.view),d.setMenu(a.view),a.$on(e.notAuthenticated,function(){k.logout()}),this.openMenu=function(a,b){a(b)},this.selectMenu=function(a){switch(a.state){case"Training":d.choseMonth(a.funct)}},k.logout=function(){d.logout(),c.go("Login")},k.selectItem=j,k.toggleList=h,k.back=i}]),angular.module("Login",[]).controller("loginCtrl",["$scope","$state","AuthService","CommonService",function(a,b,c,d){a.login={username:"",password:"",remember:!1},a.loginPost=function(){c.login(a.login).then(function(a){d.setUser(a),b.go("Main")},function(){})},a.clear=function(){a.login={remember:!1}}}]),angular.module("Main",[]).controller("mainCtrl",["CommonService",function(a){a.init()}]),angular.module("Dashboard",["ngRateIt"]).controller("dashCtrl",["$scope","$state","CordovaService","CommonService","TrainingService",function(a,b,c,d,e){a.model={basic:0,readonly:2.5,readonly_enables:!0,minMaxStep:6,minMaxStep2:8.75,pristine:3,resetable:4,heightWidth:1.5,callbacks:5,custom:4},a.user=d.getUser();var f,g;a.getPicture=function(){d.capture("images/male.64c9a7db.png")},c.ready.then(function(){f=navigator.camera.PictureSourceType,g=navigator.camera.DestinationType}),a.startTraining=function(){b.go("Training")}}]),angular.module("Engage",[]).controller("engageCtrl",function(){}),angular.module("Payment",[]).controller("paymentCtrl",function(){}),angular.module("Setting",[]).controller("settingCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("Training",[]).controller("trainingCtrl",["$scope","TrainingService",function(a,b){b.bindScheda(a)}]),angular.module("Store",[]).controller("storeCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("powerApp").run(["$templateCache",function(a){a.put("views/dashboard.html",'<md-content layout="column" layout-fill layout-align="start center"> <img src="images/male.64c9a7db.png" class="image" ng-click="getPicture()"> <ng-rate-it min="0" max="5" ng-model="model.resetable" resetable="false"></ng-rate-it> <p>{{user.nome}} {{user.cognome}}</p> <md-content ng-if="1==2"> <md-card> <md-card-title> <md-card-title-text> <span class="md-headline">Action required</span> </md-card-title-text> </md-card-title> <md-card-content> <p> status payment </p> <p> status scheda </p> </md-card-content> <md-card-actions layout="row" layout-align="end end"> <md-button>Action 1</md-button> </md-card-actions> </md-card> </md-content> <md-fab-speed-dial md-direction="up" md-open="false" class="md-scale md-fab-bottom-right md-hover-full speed-dial"> <md-fab-trigger> <md-button class="md-fab"> <ng-md-icon icon="bubble_chart"></ng-md-icon> </md-button> </md-fab-trigger> <md-fab-actions> <md-button class="md-fab md-mini" ng-click="startTraining()"> <ng-md-icon icon="play_arrow"></ng-md-icon> <md-tooltip md-direction="left">Start training</md-tooltip> </md-button> </md-fab-actions> </md-fab-speed-dial> </md-content>'),a.put("views/dialogMonth.html",'<md-dialog> <md-dialog-content> <div class="md-dialog-content"> Select training: </div> </md-dialog-content> <md-dialog-actions layout="column" layout-align="start start"> <md-radio-group ng-model="indx"> <md-radio-button ng-repeat="item in list" value="{{$index}}"> {{item|date:\'MMM/yy\'}} </md-radio-button> </md-radio-group> </md-dialog-actions> </md-dialog>'),a.put("views/engage.html","<p>This is the Engage view.</p>"),a.put("views/login.html",'<md-content flex layout="row" layout-align="center center"> <md-card> <md-card-content flex> <section layout="column" layout-sm="column" layout-align="center center" layout-wrap> <md-input-container> <label>Username</label> <input ng-model="login.username"> </md-input-container> <md-input-container> <label>Password</label> <input ng-model="login.password" type="password"> </md-input-container> </section> <section layout="column" layout-sm="row" layout-align="center center" layout-wrap> <md-checkbox ng-model="login.remember">Remember me</md-checkbox> </section> <section layout="row" layout-sm="row" layout-align="center center" layout-wrap> <md-button ng-click="loginPost()" class="md-raised md-primary">Login</md-button> <md-button ng-click="clear()" class="md-raised md-primary">Clear</md-button> </section> </md-card-content> </md-card> </md-content>'),a.put("views/main.html",'<md-content> <md-tabs md-dynamic-height md-border-bottom md-swipe-content="true" md-selected="selectedIndex"> <md-tab label="Dashboard"> <md-content class="md-padding"> <div ui-view="Dashboard"></div> </md-content> </md-tab> <md-tab label="Engage"> <md-content class="md-padding"> <div ui-view="Engage"></div> </md-content> </md-tab> <md-tab label="Payment"> <md-content class="md-padding"> <div ui-view="Payment"></div> </md-content> </md-tab> </md-tabs> </md-content>'),a.put("views/payment.html","<p>This is the payment view.</p>"),a.put("views/setting.html","<p>This is the setting view.</p>"),a.put("views/store.html","<p>This is the store view.</p>"),a.put("views/training.html",'<md-tabs md-dynamic-height md-border-bottom md-swipe-content="true" md-selected="selectedIndex"> <md-tab label="{{day.title}}" ng-repeat="day in scheda.day"> <md-content class="md-padding"> <md-content style="height: 600px"> <section ng-repeat="grp in day.gruppi"> <md-subheader class="md-primary">{{grp.nome}}</md-subheader> <md-list layout-padding> <md-list-item class="md-2-line" ng-repeat="eser in grp.esercizi"> <div class="md-list-item-text"> <h3>{{eser.nome}}</h3> <h4>{{eser.serie}} * {{eser.ripetizioni}}</h4> </div> </md-list-item> </md-list> </section> </md-content> </md-content> </md-tab> </md-tabs>')}]);