'use strict';

/**
 * @ngdoc service
 * @name powerApp.training
 * @description
 * # training
 * Service in the powerApp.
 */
angular.module('powerApp')
  .service('TrainingService', function () {
    var _self = this;

    var init = function(){
      _self.scheda = [];
      _self.index  = 0;
    };



    return {
      init: init
    };
});
