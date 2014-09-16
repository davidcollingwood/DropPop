angular.module('qldhealth').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: '/partials/menu.html'
		})
		
	;

	$urlRouterProvider.otherwise('/app/family');

});
