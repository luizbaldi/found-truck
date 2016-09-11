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
<<<<<<< HEAD
        })
        .state('clientlogin',{
            url: '/clientlogin',
            controller: 'ClientLoginController',
            templateUrl: 'views/user/clientlogin.html'
        })
=======
        });
>>>>>>> 364b6dad51d62af5fc0174a33bda57d857a59122
       
});