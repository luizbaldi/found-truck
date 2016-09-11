foundtruck.controller('FindLocationController', ['$scope', '$state', function($scope, $state) {

	$scope.changeView = function(viewName) {
		$state.go(viewName);
	};

	$scope.test = function() {
		alert('test');
	};
}]);