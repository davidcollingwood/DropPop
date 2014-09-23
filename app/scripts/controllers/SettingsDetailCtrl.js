angular.module('droppop.controllers')

    .controller('SettingsDetailCtrl', function($scope, $timeout, $ionicNavBarDelegate, settings) {
        
        $scope.settings = settings;
        
        $scope.done = function() {
            $timeout(function() {
                $ionicNavBarDelegate.back();
            }, 200);
        };
        
    })

;