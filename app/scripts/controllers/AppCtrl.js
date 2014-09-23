angular.module('droppop.controllers')

    .controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
        
        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
        
    })

;