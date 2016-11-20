foundtruck.controller('FindLocationAlternativeController', ['$scope', '$state', 'localStorageService', function($scope, $state, localStorageService) {
	$scope.loadTrucks = function(address) {
		/* Saves address details on localstorage to be used later on */
		localStorageService.set('address', JSON.stringify(address));
		localStorageService.set('addressTypeFlag', 'alternative');
		
		$state.go('loadtrucks');
	};

}]);