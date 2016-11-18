"use strict";angular.module("powerApp",["ui.router","uiRouterStyles","ngAnimate","ngAria","ngMaterial","ngMessages","ngSanitize","ngTouch","ngMdIcons","LocalStorageModule","Login","Main","Dashboard","Engage","Payment","Setting","Training","Store"]).run(["$rootScope","$state","AuthService",function(a,b,c){a.$on("$stateChangeStart",function(a,d){c.isAuthenticated()||"Login"!==d.name&&(a.preventDefault(),b.go("Login"))})}]),angular.module("powerApp").constant("API_ENDPOINT",{url:"http://localhost:8181"}).constant("AUTH_EVENTS",{notAuthenticated:"auth-not-authenticated"}).constant("MENU",[{icon:"dashboard",state:"Dashboard",nested:"Main",type:"l"},{icon:"directions_walk",state:"Training",nested:!1,type:"l"},{icon:"settings",state:"Setting",nested:!1,type:"l"},{icon:"logout",state:"Logout",action:"logout",type:"f"}]),angular.module("powerApp").config(["localStorageServiceProvider","$mdThemingProvider","$stateProvider","$urlRouterProvider","$mdDateLocaleProvider","$httpProvider",function(a,b,c,d,e,f){e.formatDate=function(a){return moment(a).format("DD-MM-YYYY")},b.theme("default").primaryPalette("grey").accentPalette("red"),f.interceptors.push("AuthInterceptor"),d.otherwise("/main"),c.state("Main",{url:"/main",data:{css:"styles/main.css"},views:{"":{templateUrl:"views/main.html",controller:"mainCtrl",controllerAs:"vm"},"Dashboard@Main":{templateUrl:"views/dashboard.html",controller:"dashCtrl",controllerAs:"vm"},"Engage@Main":{templateUrl:"views/engage.html",controller:"engageCtrl",controllerAs:"vm"},"Payment@Main":{templateUrl:"views/payment.html",controller:"paymentCtrl",controllerAs:"vm"}}}).state("Login",{url:"/login",templateUrl:"views/login.html",controller:"loginCtrl"}).state("Setting",{url:"/setting",templateUrl:"views/setting.html",controller:"settingCtrl"}).state("Store",{url:"/store",templateUrl:"views/store.html",controller:"storeCtrl"}).state("Training",{url:"/training",templateUrl:"views/training.html",controller:"trainingCtrl"})}]),angular.module("powerApp").service("CordovaService",["$q","$window",function(a,b){var c=a.defer();this.ready=c.promise,document.addEventListener("deviceready",function(){c.resolve(b.cordova)})}]),angular.module("powerApp").factory("AuthInterceptor",["$rootScope","$q","AUTH_EVENTS",function(a,b,c){return{responseError:function(d){return a.$broadcast({401:c.notAuthenticated}[d.status],d),b.reject(d)}}}]),angular.module("powerApp").service("AuthService",["$rootScope","$http","$q","API_ENDPOINT","localStorageService",function(a,b,c,d,e){function f(){var a=e.get(l);a&&h(a)}function g(a){e.set(l,a),h(a)}function h(a){m=!0,j=a,b.defaults.headers.common.Authorization=j}function i(){j=void 0,m=!1,b.defaults.headers.common.Authorization=void 0,e.remove(l)}var j,k=this,l="tokenKey",m=!1,n=function(a){return c(function(c,e){b.post(d.url+"/mobileAuth",a).then(function(a){a.data.success?(k.view.isLogged=!0,g(a.data.token),c(a.data.user)):e(a.data.msg)})})},o=function(a){k.view=a},p=function(){k.view.isLogged=!1,i()},q=function(){f()};return{init:q,loginStatus:o,login:n,logout:p,isAuthenticated:function(){return m}}}]),angular.module("powerApp").service("TrainingService",[function(){var a=this,b=function(b,c){a.schede=c,a.index=0,b.then(function(a){console.log(a)})};return{init:b}}]),angular.module("powerApp").service("CommonService",["$http","$q","AuthService","TrainingService","API_ENDPOINT",function(a,b,c,d,e){var f=this,g=function(){a.post(e.url+"/mobileInfo",f.user).then(function(c){f.userinfo=c.data.userInfo;var g=b(function(b,c){a.post(e.url+"/mobileScheda",f.userinfo.scheda[0]._id).then(function(a){a.data.success?b(a.data.list):c()})});d.init(g,f.userinfo.scheda)})},h=function(a){c.loginStatus(a)},i=function(){c.logout()},j=function(){return f.user},k=function(a){f.user=a};return{init:g,setUser:k,getUser:j,wrapAuth:h,logout:i}}]),angular.module("powerApp").controller("appCtrl",["$scope","$mdSidenav","$state","CommonService","AUTH_EVENTS","MENU",function(a,b,c,d,e,f){function g(){b("left").toggle()}function h(){window.history.back()}function i(a){j.selected=a;var b=a.state;if("l"===a.type)a.nested!==!1&&(b=a.nested),c.go(b);else if("f"===a.type)switch(a.action){case"logout":j.logout()}}var j=this;a.view={sidemenu:f,isLogged:!1},d.wrapAuth(a.view),a.$on(e.notAuthenticated,function(){j.logout()}),j.logout=function(){d.logout(),c.go("Login")},j.selectItem=i,j.toggleList=g,j.back=h}]),angular.module("Login",[]).controller("loginCtrl",["$scope","$state","AuthService","CommonService",function(a,b,c,d){a.login={username:"",password:"",remember:!1},a.loginPost=function(){c.login(a.login).then(function(a){d.setUser(a),b.go("Main")},function(){})},a.clear=function(){a.login={remember:!1}}}]),angular.module("Main",[]).controller("mainCtrl",["CommonService","TrainingService",function(a,b){a.init()}]),angular.module("Dashboard",["ngRateIt"]).controller("dashCtrl",["$scope","$state","CordovaService","CommonService",function(a,b,c,d){function e(a){var b=document.getElementById("myImage");b.src=a}function f(a){console.log(a)}a.model={basic:0,readonly:2.5,readonly_enables:!0,minMaxStep:6,minMaxStep2:8.75,pristine:3,resetable:4,heightWidth:1.5,callbacks:5,custom:4},a.user=d.getUser(),a.getPicture=function(){navigator.camera.getPicture(e,f,{quality:50,destinationType:Camera.DestinationType.FILE_URI})},c.ready.then(function(){console.log("ok")}),a.startTraining=function(){b.go("Training")}}]),angular.module("Engage",[]).controller("engageCtrl",function(){}),angular.module("Payment",[]).controller("paymentCtrl",function(){}),angular.module("Setting",[]).controller("settingCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("Training",[]).controller("trainingCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("Store",[]).controller("storeCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("powerApp").run(["$templateCache",function(a){a.put("views/dashboard.html",'<md-content layout="column" layout-fill layout-align="start center"> <img src="http://placekitten.com/g/400/200" class="image"> <ng-rate-it min="0" max="5" ng-model="model.resetable" resetable="false"></ng-rate-it> <p>{{user.nome}} {{user.cognome}}</p> <md-content ng-if="1==2"> <md-card> <md-card-title> <md-card-title-text> <span class="md-headline">Action required</span> </md-card-title-text> </md-card-title> <md-card-content> <p> status payment </p> <p> status scheda </p> </md-card-content> <md-card-actions layout="row" layout-align="end end"> <md-button>Action 1</md-button> </md-card-actions> </md-card> </md-content> <md-button ng-click="getPicture()">click</md-button> <md-fab-speed-dial md-direction="up" md-open="false" class="md-scale md-fab-bottom-right md-hover-full speed-dial"> <md-fab-trigger> <md-button class="md-fab"> <ng-md-icon icon="bubble_chart"></ng-md-icon> </md-button> </md-fab-trigger> <md-fab-actions> <md-button class="md-fab md-mini" ng-click="startTraining()"> <ng-md-icon icon="play_arrow"></ng-md-icon> <md-tooltip md-direction="left">Start training</md-tooltip> </md-button> </md-fab-actions> </md-fab-speed-dial> </md-content>'),a.put("views/engage.html","<p>This is the Engage view.</p>"),a.put("views/login.html",'<md-content flex layout="row" layout-align="center center"> <md-card> <md-card-content flex> <section layout="column" layout-sm="column" layout-align="center center" layout-wrap> <md-input-container> <label>Username</label> <input ng-model="login.username"> </md-input-container> <md-input-container> <label>Password</label> <input ng-model="login.password" type="password"> </md-input-container> </section> <section layout="column" layout-sm="row" layout-align="center center" layout-wrap> <md-checkbox ng-model="login.remember">Remember me</md-checkbox> </section> <section layout="row" layout-sm="row" layout-align="center center" layout-wrap> <md-button ng-click="loginPost()" class="md-raised md-primary">Login</md-button> <md-button ng-click="clear()" class="md-raised md-primary">Clear</md-button> </section> </md-card-content> </md-card> </md-content>'),a.put("views/main.html",'<md-content> <md-tabs md-dynamic-height md-border-bottom md-swipe-content="true" md-selected="selectedIndex"> <md-tab label="Dashboard"> <md-content class="md-padding"> <div ui-view="Dashboard"></div> </md-content> </md-tab> <md-tab label="Engage"> <md-content class="md-padding"> <div ui-view="Engage"></div> </md-content> </md-tab> <md-tab label="Payment"> <md-content class="md-padding"> <div ui-view="Payment"></div> </md-content> </md-tab> </md-tabs> </md-content>'),a.put("views/payment.html","<p>This is the payment view.</p>"),a.put("views/setting.html","<p>This is the setting view.</p>"),a.put("views/store.html","<p>This is the store view.</p>"),a.put("views/training.html",'<div layout="row"> <ng-md-icon icon="keyboard_arrow_left" layout="start"></ng-md-icon> <div layout="center"> data</div> <ng-md-icon icon="keyboard_arrow_right" layout="end"> </ng-md-icon> </div> <section> <md-subheader class="md-primary">Unread Messages</md-subheader> <md-list layout-padding> <md-list-item class="md-3-line" ng-repeat="message in messages"> <div class="md-list-item-text"> <p> test </p> </div> </md-list-item> </md-list> </section>')}]);