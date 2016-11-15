'use strict';

/**
 * @ngdoc service
 * @name powerApp.'APIENDPOINT'
 * @description
 * # 'APIENDPOINT'
 * Constant in the powerApp.
 */
angular.module('powerApp')
  .constant('API_ENDPOINT',
//  {url: 'http://powerhero.cloudno.de'}
  {url: 'http://localhost:8181'}
)
  .constant('AUTH_EVENTS', {notAuthenticated: 'auth-not-authenticated'})

  .constant('MENU', [{
                icon:"dashboard",
                state:"Dashboard",
                nested: 'Main',
                type: 'l'
              },{
                icon:"directions_walk",
                state:"Training",
                nested: false,
                type: 'l'
              },{
                icon:"settings",
                state:"Setting",
                nested: false,
                type: 'l'
              },{
                icon:"logout",
                state:"Logout",
                action: "logout",
                type: 'f'
              }]);
