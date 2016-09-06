foundtruck.controller('FindLocationController', ['$scope', '$location', function($scope, $location) {
	$scope.goBack = function() {
		$location.path('#/');
	};
}]);