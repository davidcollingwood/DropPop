angular.module('droppop.controllers')

    .controller('FriendCtrl', function($scope, $stateParams, user) {
        
        $scope.friend = user.getFriend($stateParams.friend_id);
        
    })

;