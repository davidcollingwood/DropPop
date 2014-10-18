angular.module('droppop.models')
    
    .service('$user', function(localStorageService, Profile, Article) {
        
        var favourites = [];
        
        var user = function(config) {
            
            config = config || {};
            
            this.friends = [];
            this.favourites = [];
            
            angular.forEach(config.friends, function(profile) {
                this.friends.push(Profile.create(profile));
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
             * Get articles that the user has marked as favourite
             *
             * @return array
             */
            getFavourites: function() {
                return this.favourites;
            },
            
            /**
             * Get article that the user has marked as favourite by ID
             *
             * @param int favourite_id
             * @return article
             */
            getFavourite: function(favourite_id) {
                return this.favourites[favourite_id];
            },
            
            /**
             * Get the ID for an article that the user has marked as favourite
             *
             * @param article
             * @return int
             */
            getFavouriteId: function(article) {
                return this.favourites.findIndex(function(favourite) {
                    return favourite.title == article.title;
                });
            },
            
            /**
             * Check if an article has been marked as favourite
             *
             * @param article
             * @return bool
             */
            hasFavourited: function(article) {
                return this.favourites.some(function(favourite) {
                    return favourite.title == article.title;
                });
            },
            
            /**
             * Mark article as favourite
             *
             * @param article
             */
            addFavourite: function(article) {
                this.favourites.push(article);
                this.save();
            },
            
            /**
             * Unmark article as favourite
             *
             * @param article
             */
            removeFavourite: function(article) {
                this.favourites.splice(this.getFavouriteId(article), 1);
                this.save();
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
    
    .factory('User', function(localStorageService, $q, $http, $user, Profile, Article) {
        
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
                return $q.all([
                    Profile.get(0),
                    Profile.get(1),
                    Profile.get(2)
                ]);
                
/*
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
*/
            },
            
            /**
             * Generate a random user from api.randomuser.me
             *
             * @return promise
             * @resolve object
             */
/*
            generateRandomUser: function() {
                var deferred = $q.defer();
                
                $http.get('http://api.randomuser.me/').success(function(response) {
                    deferred.resolve(response.results[0].user);
                }).catch(function(err) {
                    deferred.reject(err);
                });
                
                return deferred.promise;
            },
*/
            
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