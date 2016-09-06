var foundtruck = angular.module('foundtruck', ['ngRoute']);

foundtruck.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'UserLoginController',
			templateUrl: 'views/user/login.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});