angular.module('droppop.services')
    
    .factory('settings', function(localStorageService) {
        
        var service = {
            notifications: true,
            imageResolution: 'high'
        };
        
        return service;
        
    })
    
;