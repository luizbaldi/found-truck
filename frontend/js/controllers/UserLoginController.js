foundtruck.controller('UserLoginController', ['$scope','UserLoginService', '$location', function($scope, UserLoginService, $location) {

	// Test if login data is registered
	$scope.doLogin = function(user) {
		UserLoginService.success(function(userData) {
			var isValidLogin = userData.users.some(function(user) {
				return (user.email == this.user.email && user.password == this.user.password);
			}.bind(this));

			if (isValidLogin) {
				$location.path('/views/user/findlocation.html');
			} else {
				alert('Email or password is not valid');
			}
		}.bind(this));
	};
}]);