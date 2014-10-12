angular.module('droppop.services')
    
    .service('wikitude', function($window, $q, $ionicPlatform, WIKITUDE_WORLD, messages) {
        
        var wikitude_plugin;
        
        $ionicPlatform.ready(function() {
            if (ionic.Platform.isWebView()) {
                wikitude_plugin = $window.cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
                wikitude_plugin.setOnUrlInvokeCallback(service.onUrlInvoked);
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
                
                if (angular.isUndefined(wikitude_plugin)) {
                    deferred.reject(messages.error.wikitude.device_not_supported);
                    return deferred.promise;
                }
                
                wikitude_plugin.isDeviceSupported(function() {
                    deferred.resolve();
                }, function() {
                    console.log('device not supported');
                    deferred.reject(messages.error.wikitude.device_not_supported);
                });
                
                return deferred.promise;
            },
            
            /**
             * Load the AR world
             */
            loadWorld: function() {
                return service.isSupported().then(function() {
                    return wikitude_plugin.loadARchitectWorld(WIKITUDE_WORLD);
                });
            },
            
            /**
             * Listen for any url changes in the AR world
             */
            onUrlInvoked: function(url) {
                alert('url invoked: ' + url);
                switch (url.substr(22)) {
                    case 'close':
                        alert('close wikitude');
                        wikitude_plugin.close();
                        break;
                }
            }
            
        };
        
        return service;
        
    })
    
;