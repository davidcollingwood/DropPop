angular.module('droppop.models')

    .service('$article', function() {
        
        var article = function(config) {
            
            config = config || {};
            
            this.title = config.title || '';
            this.content = config.content || '';
            this.description = config.description || '';
            this.author = config.author || '';
            
        };
        
        return article;
        
    })
    
    .factory('Article', function($q, $http, $article) {
        
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
                    return articles[article_id];
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
                return $http.get('data/articles.json').success(function(data) {
                    angular.forEach(data, service.add);
                });
            }
            
        };
        
        return service;
        
    })

;