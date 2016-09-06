foundtruck.controller('UserLoginController', ['$scope','UserLoginService', function($scope, UserLoginService) {

	// Test if login data is registered
	$scope.doLogin = function(user) {
		UserLoginService.success(function(userData) {
			var isValidLogin = userData.users.some(function(user) {
				return (user.email == this.user.email && user.password == this.user.password);
			}.bind(this));

			if (isValidLogin) {
				console.log('is valid');
			} else {
				console.log('is not valid');
			}
		}.bind(this));
	};
}]);