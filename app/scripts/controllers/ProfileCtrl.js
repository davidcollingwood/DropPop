angular.module('droppop.controllers')

    .controller('ProfileCtrl', function($scope, $ionicActionSheet, user, profile, Article) {
        
        var user_profile = user.getProfile();
        $scope.profile = profile;
        
        $scope.getFriendClass = function() {
            if (user_profile.hasFriend($scope.profile))
                return 'ion-ios7-personadd';
            return 'ion-ios7-personadd-outline';
        };
        
        $scope.toggleFriend = function() {
            if (user_profile.hasFriend($scope.profile))
                $scope.removeFriend();
            else
                $scope.addFriend();
        };
        
        $scope.removeFriend = function() {
            $ionicActionSheet.show({
                destructiveText: 'Remove Friend',
                cancelText: 'Cancel',
                destructiveButtonClicked: function() {
                    user_profile.removeFriend($scope.profile);
                    return true;
                }
            });
        };
        
        $scope.addFriend = function() {
            user_profile.addFriend($scope.profile);
        };
        
    })

;