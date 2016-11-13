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
    'uiRouterStyles',
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
    .run(function ($rootScope, $state, AuthService) {
        $rootScope.$on('$stateChangeStart', function (event,next) {
          if (!AuthService.isAuthenticated()) {
            if (next.name !== 'Login' ) {
              event.preventDefault();
                $state.go('Login');
            }
          }else {
            //setting back history
          }
      });
  });
