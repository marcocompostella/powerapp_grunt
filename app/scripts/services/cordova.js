'use strict';

/**
 * @ngdoc service
 * @name powerApp.cordovaService
 * @description
 * # cordovaService
 * Service in the powerApp.
 */
angular.module('powerApp')
  .service('CordovaService', function ($q,$window) {
    var d = $q.defer();
    this.ready = d.promise;

    document.addEventListener('deviceready', function () {
      d.resolve($window.cordova);
    });
  });
