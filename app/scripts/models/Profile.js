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
                    console.log(profiles);
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