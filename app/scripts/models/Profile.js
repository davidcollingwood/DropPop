angular.module('droppop.models')
    
    .service('$profile', function(localStorageService, Article) {
        
        var profile = function(config) {
            
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
            
            this.bubbles_popped = config.bubbles_popped || 0;
            this.bubbles_dropped = config.bubbles_dropped || 0;
            this.count_friends = config.count_friends || 0;
            
            this.recent_articles = [];
            this.favourite_articles = [];
            
            angular.forEach(config.recent_articles, function(article) {
                this.recent_articles.push(Article.create(article));
            }, this);
            
            angular.forEach(config.favourite_articles, function(article) {
                this.favourite_articles.push(Article.create(article));
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
            }
            
        };
        
        return profile;
        
    })
    
    .factory('Profile', function(localStorageService, $q, $http, $profile, Article) {
        
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
                    return profiles[profile_id];
                });
            },
            
            /**
             * Get profile by config
             *
             * @param object config
             * @return promise
             * @resolve profile
             */
            getByConfig: function(config) {
                service.init().then(function() {
                    return service.get(service.getProfileId(config));
                });
            },
            
            /**
             * Get profile ID for profile
             *
             * @param profile
             * @return int
             */
            getProfileId: function(profile) {
                return profiles.findIndex(function(_profile) {
                    return profile.email == _profile.email;
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
                return $http.get('data/profiles.json').then(function(response) {
                    var promises = [];
                    
                    angular.forEach(response.data, function(config) {
                        promises.push(service.loadProfile(config));
                    });
                    
                    return $q.all(promises);
                });
            },
            
            /**
             * Load profile from config
             *
             * @param object config
             * @return promise
             */
            loadProfile: function(config) {
                return service.generateData().then(function(data) {
                    config.recent_articles = data.recent_articles;
                    config.favourite_articles = data.favourite_articles;
                    config.bubbles_popped = data.bubbles_popped;
                    config.bubbles_dropped = data.bubbles_dropped;
                    config.count_friends = data.count_friends;
                    
                    service.add(config);
                });
            },
            
            /**
             * Generate articles config
             *
             * @return object
             */
            generateData: function() {
                return $q.all([
                    service.generateRecentArticles(),
                    service.generateFavouriteArticles(),
                    service.generateBubblesPopped(),
                    service.generateBubblesDropped(),
                    service.generateCountFriends()
                ]).then(function(articles) {
                    return {
                        recent_articles: articles[0],
                        favourite_articles: articles[1],
                        bubbles_popped: articles[2],
                        bubbles_dropped: articles[3],
                        count_friends: articles[4]
                    };
                });
            },
            
            generateRecentArticles: function() {
                return $q.all([
                    service.generateArticle(),
                    service.generateArticle(),
                    service.generateArticle(),
                    service.generateArticle()
                ]);
            },
            
            generateFavouriteArticles: function() {
                return $q.all([
                    service.generateArticle(),
                    service.generateArticle(),
                    service.generateArticle(),
                    service.generateArticle()
                ]);
            },
            
            generateArticle: function() {
                return Article.get(Math.round(Math.random() * 10));
            },
            
            generateBubblesPopped: function() {
                return $q.when(Math.floor(Math.random() * 500 + 100));
            },
            
            generateBubblesDropped: function() {
                return $q.when(Math.floor(Math.random() * 100 + 50));
            },
            
            generateCountFriends: function() {
                return $q.when(Math.floor(Math.random() * 50));
            }
            
        };
        
        return service;
        
    })

;