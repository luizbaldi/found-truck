foundtruck.controller('NavMenuController', ['$scope','localStorageService', '$state', '$uibModalInstance', function($scope, localStorageService, $state, $uibModalInstance) {
	
	$scope.checkUserSession = function() {
		var userSession = localStorageService.get('userSession');

		if (userSession == 'anon') {
			$scope.isAnon = true;
			$scope.name = 'Visitante';
		} else {
			$scope.isAnon = false;

			var userData = JSON.parse(userSession);

			$scope.name = userData.personalData[0].name;
		}
	};

	$scope.logoff = function() {
		// Clear user session data before redirect
		localStorageService.remove('userSession');
		// Closes the side menu instance
		$uibModalInstance.close();
		
		$state.go('userLogin');
	}
}]);