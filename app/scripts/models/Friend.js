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