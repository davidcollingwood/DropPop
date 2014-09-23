angular.module('droppop.services')
    
    .service('wikitude', function($window, $q, WIKITUDE_WORLD) {
        
        var wikitude_plugin = $window.cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        
        var service = {
            
            /**
             * Check if the device supports the wikitude plugin
             *
             * @return promise
             */
            isSupported: function() {
                var deferred = $q.defer();
                
                wikitude_plugin.isDeviceSupported(deferred.resolve, deferred.reject);
                
                return deferred.promise;
            },
            
            /**
             * Load the AR world
             */
            loadWorld: function() {
                wikitude_plugin.loadARchitectWorld("");
            }
            
        };
        
        return service;
        
    })
    
;