foundtruck.controller('UserLoginController', ['$scope','UserLoginService', '$location', function($scope, UserLoginService, $location) {

	// Test if login data is registered
	$scope.doLogin = function(user) {
		UserLoginService.success(function(userData) {
			var isValidLogin = userData.some(function(user) {
				return (user.email == this.user.email && user.password == this.user.password);
			}.bind(this));

			if (isValidLogin) {
				alert('Login is valid');
			} else {
				alert('Email or password is not valid');
			}
		}.bind(this));
	};
}]);