foundtruck.controller('ManagerLoginController', ['$scope', '$state', function($scope, $state) {
	$scope.doLogin = function() {
		$state.go('main');
	};
}]);