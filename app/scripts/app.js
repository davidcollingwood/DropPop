angular.module('droppop', [
    'ionic',
    'LocalStorageModule',
    'partials',
    'droppop.controllers',
    'droppop.directives',
    'droppop.services',
    'droppop.filters',
    'droppop.models'
]);

angular.module('droppop.controllers', []);
angular.module('droppop.directives', []);
angular.module('droppop.services', []);
angular.module('droppop.filters', []);
angular.module('droppop.models', []);

angular.module('droppop')
    
    .constant('WIKITUDE_WORLD', 'www/world/index.html')
    
    .constant('$ionicLoadingConfig', {
        template: '<i class="ion-loading-c"></i>'
    })
    
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            
        });
    })

;