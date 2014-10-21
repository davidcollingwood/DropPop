angular.module('droppop.services')

    .service('$sounds', function() {
        
        return {
            pop: new Howl({ urls: ['sounds/pop.mp3'] })
        };
    })

;