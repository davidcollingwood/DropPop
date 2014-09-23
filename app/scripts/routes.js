angular.module('droppop')

    .config(function($stateProvider, $urlRouterProvider) {
    
    	$stateProvider
    		
    		.state('app', {
    			url: '/app',
    			abstract: true,
    			templateUrl: '/partials/app.html'
    		})
    		
    		.state('app.home', {
        		url: '/home',
        		views: {
            		'app': {
                		templateUrl: '/partials/home.html'
            		}
        		}
    		})
    		
    	;
    
    	$urlRouterProvider.otherwise('/app/home');
    
    })

;
