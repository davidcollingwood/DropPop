angular.module('droppop.controllers')

    .controller('FavouritesCtrl', function($scope, user) {
        
        $scope.favourites = user.getFavourites();
        
    })

;