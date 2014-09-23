angular.module('droppop.services')
    
    .factory('settings', function(localStorageService) {
        
        var service = {
            sync: true,
            notifications: true,
            imageResolution: 'high',
            language: 'eng'
        };
        
        return service;
        
    })
    
;