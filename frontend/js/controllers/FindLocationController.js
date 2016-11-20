foundtruck.controller('FindLocationController', ['$scope', '$state', 'localStorageService',  function($scope, $state, localStorageService) {

	$scope.changeView = function(viewName) {
		$state.go(viewName);
	};

	$scope.findMe = function() {
		var latitude;
		var longitude;

	    if (window.navigator && window.navigator.geolocation) {
	        var geolocation = window.navigator.geolocation;
	        geolocation.getCurrentPosition(successOnLoadAddress, errorOnLoadAddress);
	    } else {
	        alert('Geolocalização não suportada em seu navegador.');
	    }
	};

	var successOnLoadAddress = function(location) {
		console.log(location);
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
        alert('Sua latitude estimada é: ' + latitude + ' e longitude: ' + longitude);

        var geocodedAddress = {
        	lat: location.coords.latitude, 
        	lng: location.coords.longitude
        };

        /* Saves address details on localstorage to be used later on */
		localStorageService.set('geocodedAddress', JSON.stringify(geocodedAddress));
		localStorageService.set('addressTypeFlag', 'findlocation');

		$state.go('loadtrucks');
	};

	var errorOnLoadAddress = function(location) {
		console.log(error);
	};
}]);