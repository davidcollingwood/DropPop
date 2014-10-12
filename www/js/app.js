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

    .controller('ArticleModalCtrl', function($scope) {
        
        $scope.cancel = function() {
            $scope.modal.remove();
        };
        
        $scope.save = function() {
            $scope.modal.remove();
        };
        
    })

;
angular.module('droppop.controllers')

    .controller('ExploreCtrl', function($scope, $timeout, $ionicLoading, $ionicPopup, wikitude) {
        
        $scope.loadWorld = function() {
            $ionicLoading.show();
            
            $timeout(function() {
                wikitude.loadWorld().catch(function(err) {
                    $ionicPopup.alert({
                        title: 'Wikitude Plugin',
                        template: err
                    });
                }).finally(function() {
                    $ionicLoading.hide();
                });
            }, 500);
        };
        
    })

;
angular.module('droppop.controllers')

    .controller('FavouritesCtrl', function($scope, user) {
        
        $scope.favourites = user.getFavourites();
        
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

    .service('$article', function() {
        
        var article = function(config) {
            
            this.title = config.title || '';
            this.content = config.content || '';
            this.description = config.description || '';
            this.author = config.author || '';
            
        };
        
        return article;
        
    })
    
    .factory('Article', function($q, $article) {
        
        var service = {
            
            /**
             * Create a new instance of $article
             *
             * @param object config
             * @return article
             */
            create: function(config) {
                return new $article(config);
            },
            
            /**
             * Generate config for a random article
             *
             * @return object
             */
            generate: function() {
                return {
                    title: 'Article #' + Math.floor(Math.random() * 10),
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    author: 'Lorem Ipsum'
                };
            }
            
        };
        
        return service;
        
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
    
    .service('$user', function(localStorageService, Friend, Article) {
        
        var user = function(config) {
            
            config = config || {};
            
            console.log(config);
            
            this.friends = [];
            this.favourites = [];
            
            angular.forEach(config.friends, function(friend) {
                this.friends.push(Friend.create(friend));
            }, this);
            
            angular.forEach(config.favourites, function(favourite) {
                this.favourites.push(Article.create(favourite));
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
             * Get articles that the user has marked as favourite
             *
             * @return array
             */
            getFavourites: function() {
                return this.favourites;
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
    
    .factory('User', function(localStorageService, $q, $http, $user, Article) {
        
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
                    friends: service.generateFriends(),
                    favourites: service.generateFavourites()
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
            },
            
            /**
             * Generate array of favourite articles
             
             * @return promise
             * @resolve array
             */
            generateFavourites: function() {
                return $q.all([
                    service.generateFavourite(),
                    service.generateFavourite(),
                    service.generateFavourite(),
                    service.generateFavourite(),
                    service.generateFavourite()
                ]);
            },
            
            /**
             * Generate a random favourite article
             *
             * @return promise
             * @return object
             */
            generateFavourite: function() {
                return $q.when(Article.generate())
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
                		controller: 'FavouritesCtrl',
                		resolve: {
                		    user: function(User) {
                    		    return User.get();
                		    }
                		}
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
                switch (url) {
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

//# sourceMappingURL=app.js.map