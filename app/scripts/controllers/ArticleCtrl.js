angular.module('droppop.controllers')

    .controller('ArticleCtrl', function($scope, $timeout, $ionicSideMenuDelegate, $ionicActionSheet, user, article, profiles) {
        
        var body = angular.element(document.body);
        
        $scope.article = article;
        $scope.profiles = profiles;
        
        $scope.getFavouriteClass = function() {
            if (user.hasFavourited(article))
                return 'ion-ios7-star';
            return 'ion-ios7-star-outline';
        };
        
        $scope.toggleFavourite = function() {
            if (user.hasFavourited($scope.article))
                $scope.removeFavourite();
            else
                $scope.addFavourite();
        };
        
        $scope.addFavourite = function() {
            user.addFavourite($scope.article);
        };
        
        $scope.removeFavourite = function() {
            $ionicActionSheet.show({
                destructiveText: 'Remove Favourite',
                cancelText: 'Cancel',
                destructiveButtonClicked: function() {
                    user.removeFavourite($scope.article);
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