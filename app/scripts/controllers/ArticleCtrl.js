angular.module('droppop.controllers')

    .controller('ArticleCtrl', function($scope, $timeout) {
        
        var body = angular.element(document.body);
        
        $scope.drop = function() {
            if (body.hasClass('bubble-in'))
                return $scope.confirmDrop();
            
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
            }, 1000);
        };
        
    })

;