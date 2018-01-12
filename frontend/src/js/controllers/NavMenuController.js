foundtruck.controller('NavMenuController', ['$scope','localStorageService', '$state', '$uibModalInstance', function($scope, localStorageService, $state, $uibModalInstance) {
	
	$scope.checkUserSession = function() {
		var userSession = localStorageService.get('userSession');

		if (userSession == 'anon') {
			$scope.isAnon = true;
			$scope.name = 'Visitante';
		} else {
			$scope.isAnon = false;

			var userData = JSON.parse(userSession);

			$scope.name = userData.name;
		}
	};

	$scope.logoff = function() {
		// Clear user session data before redirect
		localStorageService.remove('userSession');
		// Closes the side menu instance
		$uibModalInstance.close();
		
		$state.go('userLogin');
	}

	$scope.editUserData = function() {
		$state.go('editUser');
		$uibModalInstance.close();
	};
}]);