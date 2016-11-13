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
  .constant('AUTH_EVENTS', {notAuthenticated: 'auth-not-authenticated'});
