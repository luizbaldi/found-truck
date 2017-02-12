foundtruck.controller('EditUserController', ['$scope', 'localStorageService', 'UtilService', 'UserService', '$state', function($scope, localStorageService, UtilService, UserService, $state) {
	
	$scope.loadUserData = function() {
		var userSession = localStorageService.get('userSession');

		$scope.user = JSON.parse(userSession);
	};

	$scope.updateUser = function(user) {
		UserService.update(user)
		.success(function(response) {
			if(response.error) {
				swal({
					title: response.message,
					text: "",
					type: "error"
				});
			} else {
				swal({
					title: 'Dados atualizados com sucesso!',
					text: "",
					type: "success"
				});
				localStorageService.set('userSession', JSON.stringify(response.userData));
				// $state.go('findlocation');
			}
		})
	};

	$scope.goBack = function() {
		UtilService.goBack();
	};	
}]);