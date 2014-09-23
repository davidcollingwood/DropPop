angular.module('droppop.controllers')

    .controller('SettingsCtrl', function($scope, $ionicPopup, $ionicModal, settings) {
        
        $scope.settings = settings;
        
        $scope.logout = function() {
            $ionicPopup.confirm({
                title: 'Logout',
                template: 'Are you sure you wish to logout?'
            }).then(function(response) {
                if (response) {
                    // logout
                }
            });
        };
        
        $scope.report = function() {
            $ionicModal.fromTemplateUrl('/partials/report-modal.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
            })
        };
        
    })

;