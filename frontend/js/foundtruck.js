var foundtruck = angular.module('foundtruck', ['ui.router']);

foundtruck.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider        
        .state('login', {
            url: '/',
            controller: 'UserLoginController',
            templateUrl: 'views/user/login.html'
        })
        .state('findlocation', {
        	url: '/findlocation',
        	controller: 'FindLocationController',
            templateUrl: 'views/user/findlocation.html'         
        });
});