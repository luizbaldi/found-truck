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
        })
         .state('findfoodtruck', {
            url: '/findfoodtruck',
            controller: 'FindFoodTruckController',
            templateUrl: 'views/user/findfoodtruck.html' 
        })
        .state('findlocationalternative',{
            url: '/findlocationalternative',
            controller: 'FindLocationAlternativeController',
            templateUrl: 'views/user/findlocationalternative.html'
        });
       
});