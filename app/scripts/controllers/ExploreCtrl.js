angular.module('droppop.controllers')

    .controller('ExploreCtrl', function($scope, $timeout, $ionicLoading, $ionicPopup, wikitude) {
        
        $scope.loadWorld = function() {
            $ionicLoading.show();
            
            $timeout(function() {
                wikitude.loadWorld().catch(function(err) {
                    $ionicPopup.alert({
                        title: 'Wikitude Plugin',
                        template: err
                    });
                }).finally(function() {
                    $ionicLoading.hide();
                });
            }, 500);
        };
        
    })

;