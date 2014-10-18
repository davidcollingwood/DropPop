angular.module('droppop.controllers')

    .controller('ProfileCtrl', function($scope, $ionicActionSheet, user, profile, Article) {
        
        $scope.profile = profile;
        
        $scope.getFriendClass = function() {
            if (user.hasFriend($scope.profile))
                return 'ion-ios7-personadd';
            return 'ion-ios7-personadd-outline';
        };
        
        $scope.toggleFriend = function() {
            if (user.hasFriend($scope.profile))
                $scope.removeFriend();
            else
                $scope.addFriend();
        };
        
        $scope.removeFriend = function() {
            $ionicActionSheet.show({
                destructiveText: 'Remove Friend',
                cancelText: 'Cancel',
                destructiveButtonClicked: function() {
                    user.removeFriend($scope.profile);
                    return true;
                }
            });
        };
        
        $scope.addFriend = function() {
            user.addFriend($scope.profile);
        };
        
        $scope.getArticleId = function(article) {
            return Article.getArticleId(article);
        };
        
    })

;