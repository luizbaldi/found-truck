foundtruck.controller('FindLocationAlternativeController', ['$scope', '$state', function($scope, $state) {
	$scope.loadTrucks = function() {
		$state.go('loadtrucks');
	};
}]);