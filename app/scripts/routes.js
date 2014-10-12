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
