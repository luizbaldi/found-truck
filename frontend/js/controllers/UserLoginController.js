foundtruck.controller('UserLoginController', ['$scope','UserService', '$state', 'localStorageService', function($scope, UserService, $state, localStorageService) {

	// Test if login data is registered
	$scope.doLogin = function(user, simulation) {
		if (user != 'anon') {
			UserService.doLogin(user)
			.success(function(response) {
				if(response.error) {
					swal({
						title: 'Dados incorretos, por favor preencha novamente',
						text: "",
						type: "error"
					});
				} else {
					swal({
						title: 'Bem vindo!',
						text: "",
						type: "success"
					});
					localStorageService.set('userSession', JSON.stringify(response.userData));
					$state.go('findlocation');
				}
			});
		} else {
			localStorageService.set('userSession', 'anon');
			$state.go('findlocation');
		}
		localStorageService.set('simulation', simulation);
	};

	$scope.openWindow = function(windowName) {
		$state.go(windowName);
	};
	
}]);