'use strict';

/**
 * @ngdoc service
 * @name powerApp.training
 * @description
 * # training
 * Service in the powerApp.
 */
angular.module('powerApp')
  .service('TrainingService',['$q','$http','$mdDialog','API_ENDPOINT', function ($q,$http,$mdDialog,API_ENDPOINT) {
    var _self = this;

    var init = function(schede) {
      _self.schede = schede;
      _self.index  = 0;
      downloadScheda(schede[schede.length-1]).then(function(result){
        _self.scheda = result;
      });
    };

    var downloadScheda = function(scheda){
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/mobileScheda', scheda).then(function(result) {
          if (result.data.success) {
            resolve(result.data.scheda);
          } else {
            reject();
          }
        });
      });
    };

    var setScheda = function(view) {
       _self.view = view;
       view.scheda=_self.scheda;
    };

    var popMonth = function() {
      $mdDialog.show({
        clickOutsideToClose:false,
        fullscreen: false, // Only for -xs, -sm breakpoints.
        parent: angular.element(document.body),
        templateUrl: 'views/dialogMonth.html',
        controller: DialogMonthController,
        resolve: {
          training: function(){
            return {
              schede:_self.schede,
              index :_self.index
            }
          }
        }
     })
     .then(function(index) {
       downloadScheda(_self.schede[index]).then(function(result){
         _self.index = index;
         _self.view.scheda = result;
       });;
     }, function() {

     });
    };


    return {
      init: init,
      bindScheda: setScheda,
      popMonth: popMonth
    };
}]);

function DialogMonthController($scope, $mdDialog, training) {
  var first = true;
  $scope.list = training.schede.map(function(x){return x.data});
  $scope.indx = training.index;
  $scope.$watch('indx',function(nVal,oVal){
    if (first == true) {
      first = false;
      return;
    }
    $mdDialog.hide($scope.indx);
  });
 }
