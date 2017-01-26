foundtruck.controller('UserRegisterController', ['$scope', 'UtilService', 'localStorageService', '$state', function($scope, UtilService, localStorageService, $state) {
	
	$scope.goBack = function() {
		window.history.back();
	};

	$scope.register = function(user) {
		swal({
			title: 'Dados cadastrados com sucesso!',
			text: "",
			type: "success"
		});
		localStorageService.set('userSession', 'anon');
		$state.go('findlocation');
	};

	var _validateUserData = function(user) {
		if (user) {
			if (UtilService.isEmpty(user.name) || UtilService.isEmpty(user.email) || UtilService.isEmpty(user.password) || UtilService.isEmpty(user.checkPassword)) {
				swal("Preencha todos os campos corretamente para prosseguir");
			} else if (user.password != user.checkPassword) {
				swal("Os campos de senha devem ser iguais");
			} else {
				return true;
			}
		} else {
			swal("Preencha todos os campos corretamente para prosseguir");
		} 

		return false;
	};
}]);