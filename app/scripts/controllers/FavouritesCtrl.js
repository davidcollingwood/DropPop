angular.module('droppop.controllers')

    .controller('FavouritesCtrl', function($scope, user, Article) {
        
        $scope.favourites = user.getProfile().getFavouriteArticles();
        
    })

;