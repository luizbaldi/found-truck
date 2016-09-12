foundtruck.controller('LoadTrucksController', ['$scope', 'LoadTrucksService', 'localStorageService', '$state', function($scope, LoadTrucksService, localStorageService, $state) {
	$scope.loadMap = function() {
		var addressTypeFlag = localStorageService.get('addressTypeFlag');

		if (addressTypeFlag == 'findlocation') {
			var geocodedAddress = JSON.parse(localStorageService.get('geocodedAddress'));

			/* If address was created on findme button it goes directly to create map function */
			LoadTrucksService.success(function(trucksAddress) {
				createMap(geocodedAddress, trucksAddress);
			});
		} else if (addressTypeFlag == 'alternative') {
			var userLocation = JSON.parse(localStorageService.get('address'));
			
			LoadTrucksService.success(function(trucksAddress) {
				geocodeUserLocation(userLocation, trucksAddress);
			});
		}
	};

	var geocodeUserLocation = function(userLocation, trucksAddress) {
		// Create geocoder
		geocoder = new google.maps.Geocoder();

		var formattedAddress = userLocation.street + ',' + userLocation.number.toString() + 
			',' + userLocation.city + ',' + userLocation.state;

		geocoder.geocode({'address': formattedAddress}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var geocodedLocation = results[0].geometry.location;
				createMap(geocodedLocation, trucksAddress);
			} else {
				alert('Não foi possível encontrar o endereço');
				$state.go('findlocationalternative');
			}
		}); 
	};

	var createMap = function(geocodedLocation, trucksAddress) {
		// Create mapobtions object to define properties
		var mapOptions = {
			zoom: 12,
			center: geocodedLocation
		};

		// Create the map
		map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

		// createMarker(map, new google.maps.LatLng(-19.9334783, -43.9669872), 'pow pow pow');

		// Loop through trucks and add them into the map
		for (var i = 0; i < trucksAddress.length; i++) {
			// Current object
			var currentAddress = trucksAddress[i];

			// Adding a new marker for the object
			createMarker(map, new google.maps.LatLng(currentAddress.latitude, currentAddress.longitude), currentAddress.title);
		}
	};

	var createMarker = function(map, point, title) {
		var marker = new google.maps.Marker({
			position: point,
			map: map,
			title: title
		});
		marker.setMap(map);
	};
}]);