angular.module('droppop.services')

    .service('messages', function() {
        
        return {
            
            'error': {
                'wikitude': {
                    'device_not_supported': 'Your device is not supported by the Wikitude PhoneGap plugin.'
                }
            }
            
        };
        
    })

;