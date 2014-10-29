angular.module('droppop.controllers')

    .controller('ArticleCtrl', function($scope, $timeout, $ionicSideMenuDelegate, $ionicActionSheet, $sounds, user, article, profiles) {
        
        var body = angular.element(document.body);
        var user_profile = user.getProfile();
        
        $scope.article = article;
        $scope.profiles = [];
        
/*
        for (var i = 0; i < Math.ceil(Math.random() * 4); i++) {
            $scope.profiles.push(profiles[i]);
        }
*/
        
        $scope.getFavouriteClass = function() {
            if (user_profile.hasFavouritedArticle(article))
                return 'ion-ios7-star';
            return 'ion-ios7-star-outline';
        };
        
        $scope.toggleFavourite = function() {
            if (user_profile.hasFavouritedArticle($scope.article))
                $scope.removeFavourite();
            else
                $scope.addFavourite();
        };
        
        $scope.addFavourite = function() {
            user_profile.addFavouriteArticle($scope.article);
        };
        
        $scope.removeFavourite = function() {
            $ionicActionSheet.show({
                destructiveText: 'Remove Favourite',
                cancelText: 'Cancel',
                destructiveButtonClicked: function() {
                    user.removeFavouriteArticle($scope.article);
                    return true;
                }
            });
        };
        
        $scope.drop = function() {
            if (body.hasClass('bubble-in'))
                return $scope.confirmDrop();
            
            $ionicSideMenuDelegate.canDragContent(false);
            body.addClass('bubble-animation bubble-in');
        };
        
        $scope.confirmDrop = function() {
            body.addClass('bubble-confirm');
            
            $timeout(function() {
                body.removeClass('bubble-confirm');
                body.addClass('bubble-done');
                
                $sounds.pop.play();
                
                $timeout(function() {
                    body.removeClass('bubble-done');
                }, 500);
                
                $timeout($scope.cancelDrop, 1000);
            }, 1500);
        };
        
        $scope.cancelDrop = function() {
            body.removeClass('bubble-in bubble-confirm bubble-done');
            body.addClass('bubble-out');
            
            $timeout(function() {
                body.removeClass('bubble-animation bubble-out');
                $ionicSideMenuDelegate.canDragContent(true);
            }, 1000);
        };
        
    })

;