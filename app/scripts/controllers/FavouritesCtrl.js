angular.module('droppop.controllers')

    .controller('FavouritesCtrl', function($scope, user, Article) {
        
        $scope.favourites = user.getFavourites();
        
        $scope.getArticleId = function(favourite) {
            return Article.getArticleId(favourite);
        };
        
    })

;