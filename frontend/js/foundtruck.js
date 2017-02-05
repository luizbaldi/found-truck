var foundtruck = angular.module('foundtruck', ['ui.router', 'LocalStorageModule', 'ui.bootstrap', 'ngAside']);

foundtruck.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	
    $stateProvider        
        .state('userLogin', {
            url: '/',
            controller: 'UserLoginController',
            templateUrl: 'views/user-login.html'
        })
        .state('findlocation', {
        	url: '/findlocation',
        	controller: 'FindLocationController',
            templateUrl: 'views/findlocation.html'         
        })
        .state('findlocationalternative',{
            url: '/findlocationalternative',
            controller: 'FindLocationAlternativeController',
            templateUrl: 'views/findlocationalternative.html'
        })
        .state('loadtrucks', {
            url: '/loadtrucks',
            controller: 'LoadTrucksController',
            templateUrl: 'views/loadtrucks.html' 
        })
        .state('userRegister', {
            url: '/userRegister',
            controller: 'UserRegisterController',
            templateUrl: 'views/user-register.html' 
        })
        .state('editUser', {
            url: '/editUser',
            controller: 'EditUserController',
            templateUrl: 'views/edit-user.html' 
        });
});

foundtruck.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('foundtruck')
        .setStorageType('sessionStorage');            
}]);