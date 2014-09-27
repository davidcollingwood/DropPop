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

    .constant('WIKITUDE_WORLD', 'www/world.html')
    
    .constant('$ionicLoadingConfig', {
        template: '<i class="ion-loading-c"></i>'
    })
    
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            
        });
    })

;
angular.module('droppop.controllers')

    .controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
        
        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
        
    })

;
angular.module('droppop.controllers')

    .controller('ArticleCtrl', function($scope) {
        
    })

;
angular.module('droppop.controllers')

    .controller('ExploreCtrl', function($scope) {
        
    })

;
angular.module('droppop.controllers')

    .controller('FavouritesCtrl', function($scope) {
        
    })

;
angular.module('droppop.controllers')

    .controller('FriendCtrl', function($scope, $stateParams, user) {
        
        $scope.friend = user.getFriend($stateParams.friend_id);
        
    })

;
angular.module('droppop.controllers')

    .controller('FriendsCtrl', function($scope, $ionicNavBarDelegate, user) {
        
        $scope.is_searching = false;
        $scope.friends_filter = '';
        $scope.friends = user.friends;
        
        $scope.search = function() {
            $ionicNavBarDelegate.showBar(false);
            $scope.is_searching = true;
        };
        
        $scope.cancelSearch = function() {
            $ionicNavBarDelegate.showBar(true);
            $scope.is_searching = false;
        };
        
    })

;
angular.module('droppop.controllers')

    .controller('ProfileCtrl', function($scope) {
        
    })

;
angular.module('droppop.controllers')

    .controller('ReportModalCtrl', function($scope, $timeout, $ionicPopup, $ionicLoading) {
        
        $scope.report = {
            name: '',
            email: '',
            description: ''
        };
        
        $scope.cancel = function() {
            $scope.modal.remove();
        };
        
        $scope.send = function() {
            $ionicLoading.show();
            
            $timeout(function() {
                $ionicLoading.hide();
                
                $ionicPopup.alert({
                    title: 'Report Received',
                    template: 'Your report has been received and will be investigated as soon as possible.'
                }).then(function() {
                    $scope.modal.remove();
                });
            }, 500);
        };
        
    })

;
angular.module('droppop.controllers')

    .controller('SettingsCtrl', function($scope, $ionicPopup, $ionicModal, settings) {
        
        $scope.settings = settings;
        
        $scope.logout = function() {
            $ionicPopup.confirm({
                title: 'Logout',
                template: 'Are you sure you wish to logout?'
            }).then(function(response) {
                if (response) {
                    // logout
                }
            });
        };
        
        $scope.report = function() {
            $ionicModal.fromTemplateUrl('/partials/report-modal.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
            })
        };
        
    })

;
angular.module('droppop.controllers')

    .controller('SettingsDetailCtrl', function($scope, $timeout, $ionicNavBarDelegate, settings) {
        
        $scope.settings = settings;
        
        $scope.done = function() {
            $timeout(function() {
                $ionicNavBarDelegate.back();
            }, 200);
        };
        
    })

;
angular.module('droppop.filters')

    .filter('capitalise', function() {
        return function(input) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        };
    })

;
angular.module('droppop.filters')

    .filter('imageResolution', function() {
        
        var input_map = {
            low: 'Low',
            good: 'Good',
            high: 'High',
            very_high: 'Very High'
        };
        
        return function(input) {
            
            if (input in input_map)
                return input_map[input];
            return input;
            
        };
        
    })

;
angular.module('droppop.filters')

    .filter('language', function() {
        
        var input_map = {
            eng: 'English'
        };
        
        return function(input) {
            
            if (input in input_map)
                return input_map[input];
            return input;
            
        };
        
    })

;
angular.module('droppop.models')
    
    .service('$friend', function(localStorageService) {
        
        var friend = function(config) {
            
            config = config || {};
            
            this.name = {};
            this.name.first = config.name.first || '';
            this.name.last = config.name.last || '';
            
            this.gender = config.gender || '';
            this.email = config.email || '';
            
            this.picture = {};
            this.picture.thumbnail = config.picture.thumbnail || '';
            this.picture.medium = config.picture.medium || '';
            this.picture.large = config.picture.large || '';
            
        };
        
        friend.prototype = {
            
            /**
             * Get first name
             *
             * @return string
             */
            getFirstName: function() {
                return this.name.first;
            },
            
            /**
             * Get last name
             *
             * @return string
             */
            getLastName: function() {
                return this.name.last;
            },
            
            /**
             * Get full name
             *
             * @return string
             */
            getName: function() {
                return this.getFirstName() + ' ' + this.getLastName();
            },
            
            /**
             * Get profile picture url
             *
             * @param string size
             * @return string
             */
            getPicture: function(size) {
                switch (size) {
                    case 'small':
                        return this.picture.thumbnail;
                    case 'medium':
                        return this.picture.medium;
                    default:
                        return this.picture.large;
                }
            }
            
        };
        
        return friend;
        
    })
    
    .factory('Friend', function(localStorageService, $q, $friend) {
        
        var service = {
            
            /**
             * Create a new instance of $friend
             *
             * @return friend
             */
            create: function(config) {
                return new $friend(config);
            }
            
        };
        
        return service;
        
    })

;
angular.module('droppop.models')
    
    .service('$user', function(localStorageService, Friend) {
        
        var user = function(config) {
            
            config = config || {};
            
            this.friends = [];
            
            angular.forEach(config.friends, function(friend) {
                this.friends.push(Friend.create(friend));
            }, this);
            
            this.save();
            
        };
        
        user.prototype = {
            
            /**
             * Get friend by ID
             *
             * @param int friend_id
             * @return friend
             */
            getFriend: function(friend_id) {
                return this.friends[friend_id];
            },
            
            /**
             * Save user instance to local storage
             */
            save: function() {
                localStorageService.set('user', this);
            }
            
        };
        
        return user;
        
    })
    
    .factory('User', function(localStorageService, $q, $http, $user) {
        
        var user;
        
        var service = {
            
            /**
             * Get the current instance OR create a new instance of $user
             *
             * @return promise
             * @resolve user
             */
            get: function() {
                var deferred = $q.defer();
                
                if (user) {
                    deferred.resolve(user);
                } else {
                    service.load().then(function() {
                        deferred.resolve(user);
                    }).catch(function(err) {
                        deferred.reject(err);
                    });
                }
                
                return deferred.promise;
            },
            
            /**
             * Create a new instance of $user
             *
             * @param object config
             */
            create: function(config) {
                user = new $user(config);
            },
            
            /**
             * Load user config for new instance
             *
             * @return promise
             */
            load: function() {
                var promise;
                
                if (localStorageService.get('user')) {
                    promise = service.loadLocal();
                } else {
                    promise = service.loadDefault();
                }
                
                return promise.then(function(config) {
                    return service.create(config);
                });
            },
            
            /**
             * Load user config from local resource
             *
             * @return promise
             * @resolve object
             */
            loadLocal: function() {
                return $q.when(localStorageService.get('user'));
            },
            
            /**
             * Load default values for new user
             *
             * @return promise
             * @resolve object
             */
            loadDefault: function() {
                return $q.all({
                    friends: service.generateFriends()
                });
            },
            
            /**
             * Generate array of friends
             *
             * @return promise
             * @resolve array
             */
            generateFriends: function() {
                var deferred = $q.defer();
                
                $q.all([
                    service.generateRandomUser(),
                    service.generateRandomUser(),
                    service.generateRandomUser(),
                    service.generateRandomUser(),
                    service.generateRandomUser()
                ]).then(function(friends) {
                    deferred.resolve(friends);
                }).catch(function(err) {
                    deferred.reject(err);
                });
                
                return deferred.promise;
            },
            
            /**
             * Generate a random user from api.randomuser.me
             *
             * @return promise
             * @resolve object
             */
            generateRandomUser: function() {
                var deferred = $q.defer();
                
                $http.get('http://api.randomuser.me/').success(function(response) {
                    deferred.resolve(response.results[0].user);
                }).catch(function(err) {
                    deferred.reject(err);
                });
                
                return deferred.promise;
            }
        };
        
        return service;
        
    })

;
angular.module('droppop')

    .config(function($stateProvider, $urlRouterProvider) {
    
    	$stateProvider
    		
    		.state('app', {
    			url: '/app',
    			abstract: true,
    			templateUrl: '/partials/app.html'
    		})
    		
    		.state('app.explore', {
        		url: '/explore',
        		views: {
            		'app': {
                		templateUrl: '/partials/explore.html',
                		controller: 'ExploreCtrl'
            		}
        		}
    		})
    		
    		.state('app.profile', {
        		url: '/profile',
        		views: {
            		'app': {
                		templateUrl: '/partials/profile.html',
                		controller: 'ProfileCtrl'
            		}
        		}
    		})
    		
    		.state('app.friends', {
        		url: '/friends',
        		views: {
            		'app': {
                		templateUrl: '/partials/friends.html',
                		controller: 'FriendsCtrl',
                		resolve: {
                    		user: function(User) {
                        		return User.get();
                    		}
                		}
            		}
        		}
    		})
    		
    		.state('app.friend', {
        		url: '/friends/:friend_id',
        		views: {
            		'app': {
                		templateUrl: '/partials/friend.html',
                		controller: 'FriendCtrl',
                		resolve: {
                    		user: function(User) {
                        		return User.get();
                    		}
                		}
            		}
        		}
    		})
    		
    		.state('app.article', {
        		url: '/article',
        		views: {
            		'app': {
                		templateUrl: '/partials/article.html',
                		controller: 'ArticleCtrl'
            		}
        		}
    		})
    		
    		.state('app.favourites', {
        		url: '/favourites',
        		views: {
            		'app': {
                		templateUrl: '/partials/favourites.html',
                		controller: 'FavouritesCtrl'
            		}
        		}
    		})
    		
    		.state('app.settings', {
        		url: '/settings',
        		views: {
            		'app': {
                		templateUrl: '/partials/settings.html',
                		controller: 'SettingsCtrl'
            		}
        		}
    		})
    		
    		.state('app.image-resolution', {
        		url: '/image-resolution',
        		views: {
            		'app': {
                		templateUrl: '/partials/image-resolution.html',
                		controller: 'SettingsDetailCtrl'
            		}
        		}
    		})
    		
    		.state('app.language', {
        		url: '/language',
        		views: {
            		'app': {
                		templateUrl: '/partials/language.html',
                		controller: 'SettingsDetailCtrl'
            		}
        		}
    		})
    		
    		.state('app.privacy', {
        		url: '/privacy',
        		views: {
            		'app': {
                		templateUrl: '/partials/privacy.html'
            		}
        		}
    		})
    		
    		.state('app.terms', {
        		url: '/terms',
        		views: {
            		'app': {
                		templateUrl: '/partials/terms.html'
            		}
        		}
    		})
    		
    	;
    
    	$urlRouterProvider.otherwise('/app/explore');
    
    })

;

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
// implementation of AR-Experience (aka "World")
var World = {
	// true once data was fetched
	initiallyLoadedData: false,

	// POI-Marker asset
	markerDrawable_idle: null,

	// called to inject new POI data
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {

		/*
			The example Image Recognition already explained how images are loaded and displayed in the augmented reality view. This sample loads an AR.ImageResource when the World variable was defined. It will be reused for each marker that we will create afterwards.
		*/
		World.markerDrawable_idle = new AR.ImageResource("assets/marker_idle.png");

		/*
			For creating the marker a new object AR.GeoObject will be created at the specified geolocation. An AR.GeoObject connects one or more AR.GeoLocations with multiple AR.Drawables. The AR.Drawables can be defined for multiple targets. A target can be the camera, the radar or a direction indicator. Both the radar and direction indicators will be covered in more detail in later examples.
		*/
		var markerLocation = new AR.GeoLocation(poiData.latitude, poiData.longitude, poiData.altitude);
		var markerImageDrawable_idle = new AR.ImageDrawable(World.markerDrawable_idle, 2.5, {
			zOrder: 0,
			opacity: 1.0
		});

		// create GeoObject
		var markerObject = new AR.GeoObject(markerLocation, {
			drawables: {
				cam: [markerImageDrawable_idle]
			}
		});

		// Updates status message as a user feedback that everything was loaded properly.
		World.updateStatusMessage('1 place loaded');
	},

	// updates status message shon in small "i"-button aligned bottom center
	updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

		var themeToUse = isWarning ? "e" : "c";
		var iconToUse = isWarning ? "alert" : "info";

		$("#status-message").html(message);
		$("#popupInfoButton").buttonMarkup({
			theme: themeToUse
		});
		$("#popupInfoButton").buttonMarkup({
			icon: iconToUse
		});
	},

	// location updates, fired every time you call architectView.setLocation() in native environment
	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		/*
			The custom function World.onLocationChanged checks with the flag World.initiallyLoadedData if the function was already called. With the first call of World.onLocationChanged an object that contains geo information will be created which will be later used to create a marker using the World.loadPoisFromJsonData function.
		*/
		if (!World.initiallyLoadedData) {
			// creates a poi object with a random location near the user's location
			var poiData = {
				"id": 1,
				"longitude": (lon + (Math.random() / 5 - 0.1)),
				"latitude": (lat + (Math.random() / 5 - 0.1)),
				"altitude": 100.0
			};

			World.loadPoisFromJsonData(poiData);
			World.initiallyLoadedData = true;
		}
	},
};

/* 
	Set a custom function where location changes are forwarded to. There is also a possibility to set AR.context.onLocationChanged to null. In this case the function will not be called anymore and no further location updates will be received. 
*/
//AR.context.onLocationChanged = World.locationChanged;

//# sourceMappingURL=app.js.map