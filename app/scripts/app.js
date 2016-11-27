'use strict';

/**
 * @ngdoc overview
 * @name powerApp
 * @description
 * # powerApp
 *
 * Main module of the application.
 */
angular
  .module('powerApp', [
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'ngMessages',
    'ngSanitize',
    'ngTouch',
    'ngMdIcons',
    'LocalStorageModule',

    'Login',

    'Main',
    'Dashboard',
    'Engage',
    'Payment',

    'Setting',
    'Training',
    'Store'
  ])
    .run(function ($rootScope, $state,AuthService,CommonService) {
        $rootScope.$on('$stateChangeStart', function (event,next,toParams, fromState, fromParams) {
        //  event, toState, toParams, fromState, fromParams
          if (!AuthService.isAuthenticated()) {
            if (next.name !== 'Login' ) {
              event.preventDefault();
              $state.go('Login');
            }
          }else {
            CommonService.changeState(next.name);
          }
      });
  });
