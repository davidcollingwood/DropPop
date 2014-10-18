angular.module('droppop.controllers')

    .controller('UserCtrl', function($scope, user) {
        
        $scope.is_me = true;
        $scope.profile = user.getProfile();
        
        $scope.getFriendClass = function() {
            return '';
        };
        
    })

;