'use strict';

/**
 * @ngdoc service
 * @name powerApp.config
 * @description
 * Config in the powerApp.
 */
angular.module('powerApp')
        .config(function(localStorageServiceProvider, $mdThemingProvider,
                            $stateProvider, $urlRouterProvider,
                            $mdDateLocaleProvider, $httpProvider){

      $mdDateLocaleProvider.formatDate = function(date) {
         return moment(date).format('DD-MM-YYYY');
      };

      $mdThemingProvider.theme('default')
                            .primaryPalette('grey')
                            .accentPalette('red');

      $httpProvider.interceptors.push('AuthInterceptor');

      $urlRouterProvider.otherwise('/main');
      $stateProvider
        .state('Main', {
          url : '/main',
          data : {css : 'styles/main.css'},
          views: {
            '': {
              templateUrl : 'views/main.html',
              controller  : 'mainCtrl',
              controllerAs: 'vm'},
            'Dashboard@Main':{
              templateUrl : 'views/dashboard.html',
              controller  : 'dashCtrl',
              controllerAs: 'vm'},
            'Engage@Main':{
              templateUrl : 'views/engage.html',
              controller  : 'engageCtrl',
              controllerAs: 'vm'},
            'Payment@Main':{
              templateUrl : 'views/payment.html',
              controller  : 'paymentCtrl',
              controllerAs: 'vm'},
          }
        })
        .state('Login', {
          url : '/login',
          templateUrl : 'views/login.html',
          controller  : 'loginCtrl'
        })
        .state('Setting', {
          url : '/setting',
          templateUrl : 'views/setting.html',
          controller  : 'settingCtrl'
        })
        .state('Store', {
          url : '/store',
          templateUrl : 'views/store.html',
          controller  : 'storeCtrl'
        })
        .state('Training', {
          url : '/training',
          templateUrl : 'views/training.html',
          controller  : 'trainingCtrl'
        });
});
