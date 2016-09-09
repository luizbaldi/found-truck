var foundtruck = angular.module('foundtruck', ['ngRoute']);

foundtruck.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'UserLoginController',
			templateUrl: 'views/user/login.html'
		})
		.when('/user/checkposition', {
			controller: 'CheckPositionController',
			templateUrl: 'views/user/checkposition.html'
		})
		.when('/user/findlocation', {
			controller: 'FindLocationController',
			templateUrl: 'views/user/findlocation.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});