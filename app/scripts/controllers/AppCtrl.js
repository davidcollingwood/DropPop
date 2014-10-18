angular.module('droppop.controllers')

    .controller('AppCtrl', function($scope, $rootScope, $timeout, $ionicSideMenuDelegate, $ionicLoading, $ionicPopup, wikitude) {
        
        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
        
        $rootScope.loadWorld = function() {
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