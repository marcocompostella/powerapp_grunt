'use strict';

/**
 * @ngdoc function
 * @name powerApp.controller:appCtrl
 * @description
 * # AppcontrollerCtrl
 * Controller of the powerApp
 */
angular.module('powerApp')
  .controller('appCtrl', ['$scope','$mdSidenav','$state',
                    'CommonService',
                    'AUTH_EVENTS','MENU',
    function($scope,$mdSidenav,$state,
              commonService,
              AUTH_EVENTS, MENU) {
      var _self = this;

      $scope.view = {
        sidemenu : MENU,
        isLogged : false
      };



      commonService.wrapAuth($scope.view);

      function toggleMenuList() {
        $mdSidenav('left').toggle();
      }

      function back() {
        window.history.back();
      }

      function selectItem ( item ) {
        _self.selected = item;
        var state = item.state;
        if (item.type === 'l'){
          if (item.nested !== false){
            state = item.nested;
          }
          $state.go(state);
        }else if (item.type === 'f') {
          switch (item.action){
            case "logout":
              _self.logout();
              break;
          }
        }
      }

      $scope.$on(AUTH_EVENTS.notAuthenticated, function() {
        _self.logout();
    });


    _self.logout = function() {
      commonService.logout();
      $state.go('Login');
    };

    _self.selectItem   = selectItem;
    _self.toggleList   = toggleMenuList;
    _self.back         = back;
}]);
