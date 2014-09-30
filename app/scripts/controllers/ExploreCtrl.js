angular.module('droppop.controllers')

    .controller('ExploreCtrl', function($scope, $timeout, $ionicLoading, wikitude) {
        
        $scope.loadWorld = function() {
            $ionicLoading.show();
            
            $timeout(function() {
                wikitude.loadWorld();
                $ionicLoading.hide();
            }, 500);
        };
        
    })

;