angular.module('droppop', [
    'ionic',
    'partials',
    'droppop.controllers',
    'droppop.directives',
    'droppop.services',
    'droppop.filters'
]);

angular.module('droppop.controllers', []);
angular.module('droppop.directives', []);
angular.module('droppop.services', []);
angular.module('droppop.filters', []);

angular.module('droppop')

    .constant('WIKITUDE_WORLD', 'www/world.html')
    
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            
        });
    })

;