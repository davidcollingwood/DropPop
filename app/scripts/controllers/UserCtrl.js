angular.module('droppop.controllers')

    .controller('UserCtrl', function($scope, user, Article) {
        
        $scope.is_me = true;
        $scope.profile = user.getProfile();
        
        $scope.getFriendClass = function() {
            return '';
        };
        
    })

;