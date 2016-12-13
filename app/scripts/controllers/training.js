'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:TrainingCtrl
 * @description
 * # TrainingCtrl
 * Controller of the powerApp
 */
angular.module('Training', ['swipeLi'])
  .controller('trainingCtrl', ['$scope','$mdDialog','TrainingService', function ($scope,$mdDialog,trainingService) {

    var setScheda = function(l){
      list = l;
    };

    trainingService.bindScheda($scope);


        $scope.done = function (ev,item) {

          $mdDialog.show({
              controller: DialogRiposoController,
              templateUrl: 'views/dialogRiposo.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true,
              fullscreen: true,
              resolve: {
                data: function(){
                  return {
                    riposo:item.riposo
                  }
                }
              }
          }).then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });

        };

        $scope.skip = function (item) {
          console.log('%s marked as rejected!', item);

        };

  }]);


  function DialogRiposoController($scope,$mdDialog,$interval,data) {
    $scope.time = new Date().setHours(0,0,0,0);
    var count = 0;

    function TimerTick(){
			$scope.time += 1000;
      count += 1;
      if (count < data.riposo){

      }
    }
    $interval(TimerTick, 1000);

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
