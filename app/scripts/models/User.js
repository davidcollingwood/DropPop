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