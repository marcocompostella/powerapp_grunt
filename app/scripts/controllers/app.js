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
                    'AuthService','CommonService','AUTH_EVENTS',
    function($scope,$mdSidenav,$state,authService,commonService,AUTH_EVENTS) {
      var _self = this;


   _self.menuOptions = [];

      var setAuthView = function(view){
        $scope.isLogged = view.showBar;
        if (view.showBar){
          _self.sidemenu = view.menu.sidemenu;
        }
      };

      var init = function (){
        _self.selected = $state.current;
      };

      authService.init(setAuthView, init);

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


    var originatorEv;
    _self.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    _self.logout = function() {
      authService.logout();
      $state.go('Login');
    };

    _self.selectItem   = selectItem;
    _self.toggleList   = toggleMenuList;
    _self.back         = back;
}]);
