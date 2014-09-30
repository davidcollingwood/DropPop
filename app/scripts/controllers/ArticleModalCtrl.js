angular.module('droppop.controllers')

    .controller('ArticleModalCtrl', function($scope) {
        
        $scope.cancel = function() {
            $scope.modal.remove();
        };
        
        $scope.save = function() {
            $scope.modal.remove();
        };
        
    })

;