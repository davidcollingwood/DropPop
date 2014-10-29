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

    .controller('AppCtrl', function($scope, $rootScope, $timeout, $ionicSideMenuDelegate, $ionicLoading, $ionicPopup, wikitude) {
        
        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
        
        $rootScope.loadWorld = function() {
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

    .controller('ArticleCtrl', function($scope, $timeout, $ionicSideMenuDelegate, $ionicActionSheet, $sounds, user, article, profiles) {
        
        var body = angular.element(document.body);
        var user_profile = user.getProfile();
        
        $scope.article = article;
        $scope.profiles = [];
        
        for (var i = 0; i < Math.ceil(Math.random() * 4); i++) {
            $scope.profiles.push(profiles[i]);
        }
        
        $scope.getFavouriteClass = function() {
            if (user_profile.hasFavouritedArticle(article))
                return 'ion-ios7-star';
            return 'ion-ios7-star-outline';
        };
        
        $scope.toggleFavourite = function() {
            if (user_profile.hasFavouritedArticle($scope.article))
                $scope.removeFavourite();
            else
                $scope.addFavourite();
        };
        
        $scope.addFavourite = function() {
            user_profile.addFavouriteArticle($scope.article);
        };
        
        $scope.removeFavourite = function() {
            $ionicActionSheet.show({
                destructiveText: 'Remove Favourite',
                cancelText: 'Cancel',
                destructiveButtonClicked: function() {
                    user.removeFavouriteArticle($scope.article);
                    return true;
                }
            });
        };
        
        $scope.drop = function() {
            if (body.hasClass('bubble-in'))
                return $scope.confirmDrop();
            
            $ionicSideMenuDelegate.canDragContent(false);
            body.addClass('bubble-animation bubble-in');
        };
        
        $scope.confirmDrop = function() {
            body.addClass('bubble-confirm');
            
            $timeout(function() {
                body.removeClass('bubble-confirm');
                body.addClass('bubble-done');
                
                $sounds.pop.play();
                
                $timeout(function() {
                    body.removeClass('bubble-done');
                }, 500);
                
                $timeout($scope.cancelDrop, 1000);
            }, 1500);
        };
        
        $scope.cancelDrop = function() {
            body.removeClass('bubble-in bubble-confirm bubble-done');
            body.addClass('bubble-out');
            
            $timeout(function() {
                body.removeClass('bubble-animation bubble-out');
                $ionicSideMenuDelegate.canDragContent(true);
            }, 1000);
        };
        
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

    .controller('FavouritesCtrl', function($scope, user, Article) {
        
        $scope.favourites = user.getProfile().getFavouriteArticles();
        
    })

;
angular.module('droppop.controllers')

    .controller('FriendsCtrl', function($scope, $ionicNavBarDelegate, user, Profile) {
        
        $scope.is_searching = false;
        $scope.friends_filter = '';
        $scope.friends = user.getProfile().getFriends();
        
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

    .controller('ProfileCtrl', function($scope, $ionicActionSheet, user, profile, Article) {
        
        var user_profile = user.getProfile();
        $scope.profile = profile;
        
        $scope.getFriendClass = function() {
            if (user_profile.hasFriend($scope.profile))
                return 'ion-ios7-personadd';
            return 'ion-ios7-personadd-outline';
        };
        
        $scope.toggleFriend = function() {
            if (user_profile.hasFriend($scope.profile))
                $scope.removeFriend();
            else
                $scope.addFriend();
        };
        
        $scope.removeFriend = function() {
            $ionicActionSheet.show({
                destructiveText: 'Remove Friend',
                cancelText: 'Cancel',
                destructiveButtonClicked: function() {
                    user_profile.removeFriend($scope.profile);
                    return true;
                }
            });
        };
        
        $scope.addFriend = function() {
            user_profile.addFriend($scope.profile);
        };
        
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
angular.module('droppop.controllers')

    .controller('UserCtrl', function($scope, user, Article) {
        
        $scope.is_me = true;
        $scope.profile = user.getProfile();
        
        $scope.getFriendClass = function() {
            return '';
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
            
            config = config || {};
            
            this.id = config.id || 0;
            this.title = config.title || '';
            this.content = config.content || '';
            this.description = config.description || '';
            this.author = config.author || '';
            
        };
        
        return article;
        
    })
    
    .factory('Article', function($q, $http, $api, $article) {
        
        var articles;
        
        var service = {
            
            /**
             * Init service
             *
             * @return promise
             */
            init: function() {
                if (angular.isDefined(articles))
                    return $q.when(true);
                return service.load();
            },
            
            /**
             * Get all articles
             *
             * @return promise
             * @resolve array
             */
            all: function() {
                return service.init().then(function() {
                    return articles;
                });
            },
            
            /**
             * Get article by ID
             *
             * @param int article_id
             * @return promise
             * @resolve article
             */
            get: function(article_id) {
                return service.init().then(function() {
                    return articles.find(function(article) {
                        return article.id == article_id;
                    });
                });
            },
            
            /**
             * Get article by config
             *
             * @param object config
             * @return promise
             * @resolve article
             */
            getByConfig: function(config) {
                return service.init().then(function() {
                    return service.get(service.getArticleId(config));
                });
            },
            
            /**
             * Get article ID for article
             *
             * @param article
             * @return int
             */
            getArticleId: function(article) {
                return articles.findIndex(function(_article) {
                    return article.title == _article.title;
                });
            },
            
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
             * Add a new instance of $article
             *
             * @param object config
             */
            add: function(config) {
                if (angular.isUndefined(articles))
                    articles = [];
                articles.push(service.create(config));
            },
            
            /**
             * Load articles
             *
             * @return promise
             */
            load: function() {
                return service.loadRemote().then(function(data) {
                    angular.forEach(data.articles, service.add);
                });
            },
            
            loadRemote: function() {
                return $api.get('articles');
            }
            
        };
        
        return service;
        
    })

;
angular.module('droppop.models')
    
    .service('$profile', function(localStorageService, Article) {
        
        var profile = function(config) {
            
            config = config || {};
            
            this.id = config.id || 0;
            
            this.name = {};
            this.name.first = config.first_name || '';
            this.name.last = config.last_name || '';
            this.name.full = config.full_name || '';
            
            this.gender = config.gender || '';
            this.email = config.email || '';
            
            this.picture = {};
            this.picture.thumbnail = config.picture.thumbnail || '';
            this.picture.medium = config.picture.medium || '';
            this.picture.large = config.picture.large || '';
            
            this.bubbles_popped = config.bubbles_popped || 0;
            this.bubbles_dropped = config.bubbles_dropped || 0;
            this.count_friends = config.count_friends || 0;
            
            this.recent_articles = [];
            this.favourite_articles = [];
            this.friends = [];
            
            angular.forEach(config.recent_articles, function(article) {
                Article.get(article.id).then(function(article) {
                    this.recent_articles.push(article);
                }.bind(this));
            }, this);
            
            angular.forEach(config.favourite_articles, function(article) {
                Article.get(article.id).then(function(article) {
                    this.favourite_articles.push(article);
                }.bind(this));
            }, this);
            
            angular.forEach(config.friends, function(config) {
                this.friends.push(new profile(config));
/*
                Profile.get(profile.id).then(function(profile) {
                    this.friends.push(profile);
                }.bind(this));
*/
            }, this);
            
        };
        
        profile.prototype = {
            
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
            },
            
            /**
             * Get recently read articles
             *
             * @return array
             */
            getRecentArticles: function() {
                return this.recent_articles;
            },
            
            /**
             * Get favourite articles
             *
             * @return array
             */
            getFavouriteArticles: function() {
                return this.favourite_articles;
            },
            
            /**
             * Get friends
             *
             * @return array
             */
            getFriends: function() {
                return this.friends;
            },
            
            /**
             * Get friend by ID
             *
             * @param int friend_id
             * @return profile
             */
            getFriend: function(friend_id) {
                return this.friends[friend_id];
            },
            
            /**
             * Get friend ID
             *
             * @param profile friend
             * @return int
             */
            getFriendId: function(friend) {
                return this.friends.findIndex(function(_friend) {
                    return friend.email == _friend.email;
                });
            },
            
            /**
             * Add friend
             *
             * @param profile
             */
            addFriend: function(profile) {
                this.friends.push(profile);
                this.save();
            },
            
            /**
             * Remove friend
             *
             * @param profile
             */
            removeFriend: function(profile) {
                this.friends.splice(this.getFriendId(profile), 1);
                this.save();
            },
            
            /**
             * Check whether user has friend
             *
             * @param profile
             * @return bool
             */
            hasFriend: function(profile) {
                return this.friends.some(function(friend) {
                    return profile.email == friend.email;
                });
            },
            
            /**
             * Get article that the user has marked as favourite by ID
             *
             * @param int favourite_id
             * @return article
             */
            getFavouriteArticle: function(favourite_id) {
                return this.favourite_articles[favourite_id];
            },
            
            /**
             * Get the ID for an article that the user has marked as favourite
             *
             * @param article
             * @return int
             */
            getFavouriteArticleId: function(article) {
                return this.favourite_articles.findIndex(function(favourite) {
                    return favourite.title == article.title;
                });
            },
            
            /**
             * Check if an article has been marked as favourite
             *
             * @param article
             * @return bool
             */
            hasFavouritedArticle: function(article) {
                return this.favourite_articles.some(function(favourite) {
                    return favourite.title == article.title;
                });
            },
            
            /**
             * Mark article as favourite
             *
             * @param article
             */
            addFavouriteArticle: function(article) {
                this.favourite_articles.push(article);
                this.save();
            },
            
            /**
             * Unmark article as favourite
             *
             * @param article
             */
            removeFavouriteArticle: function(article) {
                this.favourite_articles.splice(this.getFavouriteId(article), 1);
                this.save();
            },
            
        };
        
        return profile;
        
    })
    
    .factory('Profile', function(localStorageService, $q, $api, $profile, Article) {
        var profiles;
        
        var service = {
            
            /**
             * Init service
             *
             * @return promise
             */
            init: function() {
                if (angular.isDefined(profiles))
                    return $q.when(true);
                return service.load();
            },
            
            /**
             * Get all profiles
             *
             * @return promise
             * @resolve array
             */
            all: function() {
                return service.init().then(function() {
                    return profiles;
                });
            },
            
            /**
             * Get profile by ID
             *
             * @param profile_id
             * @return promise
             * @resolve profile
             */
            get: function(profile_id) {
                return service.init().then(function() {
                    return profiles.find(function(profile) {
                        return profile.id == profile_id;
                    });
                });
            },
            
            /**
             * Create a new instance of $profile
             *
             * @param object config
             * @return profile
             */
            create: function(config) {
                return new $profile(config);
            },
            
            /**
             * Add a new instance of $profile
             *
             * @param object config
             */
            add: function(config) {
                if (angular.isUndefined(profiles))
                    profiles = [];
                profiles.push(service.create(config));
            },
            
            /**
             * Load profiles
             *
             * @return promise
             */
            load: function() {
                return service.loadRemote().then(function(response) {
                    angular.forEach(response.users, service.add);
                });
            },
            
            /**
             * Load profiles from remote resource
             *
             * @return promise
             * @resolve array
             */
            loadRemote: function() {
                return $api.get('users');
            },
            
        };
        
        return service;
        
    })

;
angular.module('droppop.models')
    
    .service('$user', function(localStorageService, Profile, Article) {
        
        var favourites = [];
        
        var user = function(config) {
            
            config = config || {};
            
            this.id = config.id || 0;
            this.profile = Profile.create(config);
            
            this.save();
            
        };
        
        user.prototype = {
            
            /**
             * Get user's profile
             *
             * @return profile
             */
            getProfile: function() {
                return this.profile;
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
    
    .factory('User', function(localStorageService, $q, $http, $api, $user, Profile, Article) {
        
        var user;
        
        var service = {
            
            /**
             * Init service
             *
             * @return promise
             */
            init: function() {
                if (angular.isDefined(user))
                    return $q.when(true);
                return service.load();
            },
            
            /**
             * Get the current instance OR create a new instance of $user
             *
             * @return promise
             * @resolve user
             */
            get: function() {
                return service.init().then(function() {
                    return user;
                });
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
                return service.loadRemote().then(function(data) {
                    return service.create(data.user);
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
                return $api.get('users/me');
                 $q.all({
                    profile: service.generateProfile(),
                    friends: service.generateFriends(),
                    favourites: service.generateFavourites()
                });
            },
            
            /**
             * Load user config from remote resource
             *
             * @return promise
             * @resolve object
             */
            loadRemote: function() {
                return $api.get('users/me');
            },
            
            /**
             * Generate profile
             *
             * @return promise
             * @resolve profile
             */
            generateProfile: function() {
                return Profile.loadProfile({
                    name: {
                        first: 'test',
                        last: 'user'
                    },
                    gender: 'male',
                    email: 'example@email.com',
                    picture: {
                        thumbnail: 'http://api.randomuser.me/portraits/thumb/men/15.jpg',
                        medium: 'http://api.randomuser.me/portraits/med/men/15.jpg',
                        large: 'http://api.randomuser.me/portraits/men/15.jpg'
                    }
                });
            },
            
            /**
             * Generate array of friends
             *
             * @return promise
             * @resolve array
             */
            generateFriends: function() {
                return $q.all([
                    Profile.get(0),
                    Profile.get(1),
                    Profile.get(2)
                ]);
            },
            
            /**
             * Generate array of favourite articles
             
             * @return promise
             * @resolve array
             */
            generateFavourites: function() {
                return $q.all([
                    Article.get(0),
                    Article.get(1),
                    Article.get(2)
                ]);
            }
        };
        
        return service;
        
    })

;
/**
 * Array.prototype.findIndex()
 */

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

/**
 * Array.prototype.find()
 */

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
;angular.module('droppop')

    .config(function($stateProvider, $urlRouterProvider) {
    
    	$stateProvider
    		
    		.state('app', {
    			url: '/app',
    			abstract: true,
    			templateUrl: '/partials/app.html'
    		})
    		
    		.state('app.user', {
        		url: '/user',
        		views: {
            		'app': {
                		templateUrl: '/partials/profile.html',
                		controller: 'UserCtrl',
                		resolve: {
                    		user: function(User) {
                        		return User.get();
                    		},
                    		articles: function(Article) {
                        		return Article.init();
                    		}
                		}
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
                    		},
                            profiles: function(Profile) {
                                return Profile.init();
                            }
                		}
            		}
        		}
    		})
    		
    		.state('app.profile', {
        		url: '/profiles/:profile_id',
        		views: {
            		'app': {
                		templateUrl: '/partials/profile.html',
                		controller: 'ProfileCtrl',
                		resolve: {
                    		user: function(User) {
                        		return User.get();
                    		},
                    		profile: function($stateParams, Profile) {
                        		return Profile.get($stateParams.profile_id);
                    		}
                		}
            		}
        		}
    		})
    		
    		.state('app.article', {
        		url: '/articles/:article_id',
        		views: {
            		'app': {
                		templateUrl: '/partials/article.html',
                		controller: 'ArticleCtrl',
                		resolve: {
                    		user: function(User) {
                        		return User.get();
                    		},
                    		article: function($stateParams, Article) {
                        		return Article.get($stateParams.article_id);
                    		},
                    		profiles: function(Profile) {
                        		return Profile.all();
                    		}
                		}
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
                		    },
                		    articles: function(Article) {
                    		    return Article.init();
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
    
    	$urlRouterProvider.otherwise('/app/user');
    
    })

;

angular.module('droppop.services')
    
    .constant('API_URL', 'http://drop-pop-api.gopagoda.com/api/')
    // .constant('API_URL', 'http://droppop.api/api/')
    
    .service('$api', function($http, API_URL) {
        
        return {
            
            get: function(url) {
                return $http.get(API_URL + url).then(function(response) {
                    return response.data.data;
                });
            },
            
            post: function(url, data) {
                return $http.post(API_URL + url, data).then(function(response) {
                    return response.data.data;
                });
            }
            
        };
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

    .service('$sounds', function() {
        
        return {
            pop: new Howl({ urls: ['sounds/pop.mp3'] })
        };
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

//# sourceMappingURL=app.js.map