foundtruck.controller('UserLoginController', ['$scope','UserService', '$state', 'localStorageService', function($scope, UserService, $state, localStorageService) {

	// Test if login data is registered
	$scope.doLogin = function(user, simulation) {
		swal({
			title: 'Bem vindo!',
			text: "",
			type: "success"
		});
		localStorageService.set('userSession', 'anon');
		$state.go('findlocation');
		localStorageService.set('simulation', true);
	};

	$scope.openWindow = function(windowName) {
		$state.go(windowName);
	};
	
}]);