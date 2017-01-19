foundtruck.controller('HeaderController', ['$scope', '$state', 'localStorageService', '$aside', function($scope, $state, localStorageService, $aside) {

	$scope.openSideMenu = function() {
		$aside.open({
			templateUrl: 'custom-templates/nav-menu.html',
			controller: 'NavMenuController',
			placement: 'left',
			size: 'lg'
	    });
	}
}]);