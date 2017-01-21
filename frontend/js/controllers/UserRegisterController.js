foundtruck.controller('UserRegisterController', ['$scope', 'UtilService', 'UserService', function($scope, UtilService, UserService) {
	
	$scope.goBack = function() {
		window.history.back();
	};

	$scope.register = function(user) {
		if (_validateUserData(user)) {
			UserService.register(user)
			.success(function(response) {
				if(response.error) {
					swal({
						title: 'Dados incorretos, por favor preencha novamente',
						text: "",
						type: "error"
					});
				} else {
					swal({
						title: 'Dados cadastrados com sucesso!',
						text: "",
						type: "success"
					});
					localStorageService.set('userSession', JSON.stringify(user));
					$state.go('findlocation');
				}
			});
		}
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