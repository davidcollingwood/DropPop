angular.module('droppop.services')
    
    .service('wikitude', function($window, $q, $ionicPlatform, WIKITUDE_WORLD) {
        
        var wikitude_plugin;
        
        $ionicPlatform.ready(function() {
            if (ionic.Platform.isWebView()) {
                wikitude_plugin = $window.cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
            }
        });
        
        var service = {
            
            /**
             * Check if the device supports the wikitude plugin
             *
             * @return promise
             */
            isSupported: function() {
                var deferred = $q.defer();
                
                wikitude_plugin.isDeviceSupported(function() {
                    deferred.resolve();
                }, function() {
                    console.log('device not supported');
                    deferred.reject();
                });
                
                return deferred.promise;
            },
            
            /**
             * Load the AR world
             */
            loadWorld: function() {
                if (!ionic.Platform.isWebView())
                    return false;
                
                if (!service.isSupported())
                    return false;
                
                wikitude_plugin.loadARchitectWorld(WIKITUDE_WORLD);
                return true;
            }
            
        };
        
        return service;
        
    })
    
;