foundtruck.controller('LoadTrucksController', ['$scope', 'TrucksService', 'localStorageService', '$state', 'UtilService', '$uibModal', function($scope, TrucksService, localStorageService, $state, UtilService, $uibModal) {

	$scope.goBack = function() {
		$state.go('findlocation');
	};
	
	$scope.openSubtitle = function() {
		$uibModal.open({
			templateUrl: 'custom-templates/markers-subtitle.html',
			controller: 'ModalController',
			size: 'lg'
	    });
	};
}]);
