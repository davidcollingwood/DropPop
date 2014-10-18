angular.module('droppop.controllers')

    .controller('FriendsCtrl', function($scope, $ionicNavBarDelegate, user, Profile) {
        
        $scope.is_searching = false;
        $scope.friends_filter = '';
        $scope.friends = user.friends;
        
        $scope.getProfileId = function(friend) {
            return Profile.getProfileId(friend);
        };
        
        $scope.search = function() {
            $ionicNavBarDelegate.showBar(false);
            $scope.is_searching = true;
        };
        
        $scope.cancelSearch = function() {
            $ionicNavBarDelegate.showBar(true);
            $scope.is_searching = false;
        };
        
    })

;