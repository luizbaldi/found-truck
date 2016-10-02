foundtruck.controller('UserLoginController', ['$scope','UserLoginService', '$state', function($scope, UserLoginService, $state) {

	// Test if login data is registered
	$scope.doLogin = function(user) {
		UserLoginService.success(function(userData) {
			var isValidLogin = userData.some(function(user) {
				return (user.email == this.user.email && user.password == this.user.password);
			}.bind(this));

			if (isValidLogin) {
				alert('Login is valid');
				$state.go('findlocation');
			} else {
				alert('Email or password is not valid');
			}
		}.bind(this));
	};

	$scope.openWindow = function(windowName) {
		$state.go(windowName);
	};
}]);