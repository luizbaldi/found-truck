foundtruck.controller('NavMenuController', ['$scope', '$state', 'localStorageService', function($scope, $state, localStorageService) {
	$scope.logoff = function() {
		// Clear user session data before redirect
		localStorageService.remove('userSession');
		
		$state.go('userLogin');
	}
}]);