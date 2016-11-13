'use strict';

/**
 * @ngdoc service
 * @name powerApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the powerApp.
*/
angular.module('powerApp')
  .factory('AuthInterceptor',['$rootScope','$q','AUTH_EVENTS',function ($rootScope,$q,AUTH_EVENTS) {
      return {
        responseError: function (response) {
          $rootScope.$broadcast({
            401: AUTH_EVENTS.notAuthenticated,
          }[response.status], response);
          return $q.reject(response);
        }
      };
    }]);
