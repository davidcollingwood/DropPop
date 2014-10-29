angular.module('droppop')

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
