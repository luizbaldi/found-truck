foundtruck.controller('UserLoginController', ['$scope','UserLoginService', '$state', 'localStorageService', function($scope, UserLoginService, $state, localStorageService) {

	// Test if login data is registered
	$scope.doLogin = function(user, simulation) {
		if (user != 'anon') {
			UserLoginService.success(function(userData) {
				var isValidLogin = userData.some(function(user) {
					if (user.email == this.user.email && user.password == this.user.password) {
						localStorageService.set('userSession', JSON.stringify(user));
						return true;
					}
				}.bind(this));

				if (isValidLogin) {
					swal({
						title: 'Bem vindo!',
						text: "",
						type: "success"
					});
					$state.go('findlocation');
				} else {
					swal({
						title: 'Dados incorretos, por favor preencha novamente',
						text: "",
						type: "error"
					});
				}
			}.bind(this));
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