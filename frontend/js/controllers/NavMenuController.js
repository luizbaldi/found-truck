foundtruck.controller('NavMenuController', ['$scope', '$state', 'localStorageService', function($scope, $state, localStorageService) {

	$scope.logoff = function() {
		// Clear user session data before redirect
		localStorageService.remove('userSession');
		
		$state.go('userLogin');
	}

	$scope.toggleMenu = function() {
		$("#wrapper").toggleClass("toggled");
	};

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
}]);