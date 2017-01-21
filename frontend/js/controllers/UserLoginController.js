foundtruck.controller('UserLoginController', ['$scope','UserLoginService', '$state', 'localStorageService', function($scope, UserLoginService, $state, localStorageService) {

	// Test if login data is registered
	$scope.doLogin = function(user, simulation) {
		if (user != 'anon') {
			UserLoginService.doLogin(user)
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
					$state.go('findlocation');
				}
			})
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