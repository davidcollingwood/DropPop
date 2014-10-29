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