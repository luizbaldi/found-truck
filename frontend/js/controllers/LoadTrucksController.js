foundtruck.controller('LoadTrucksController', ['$scope', 'LoadTrucksService', 'localStorageService', '$state', 'UtilService', function($scope, LoadTrucksService, localStorageService, $state, UtilService) {
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

	$scope.goBack = function() {
		$state.go('findlocation');
	};

	var geocodeUserLocation = function(userLocation, trucksAddress) {
		// Create geocoder
		geocoder = new google.maps.Geocoder();

		var formattedAddress = userLocation.street + ',' + userLocation.number.toString() + 
			',' + userLocation.city + ',' + userLocation.state;

		geocoder.geocode({'address': formattedAddress}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

				// Creates a simpler object containing only lat and lng properties
				var geocodedLocation = {
					lat: results[0].geometry.location.lat(),
					lng: results[0].geometry.location.lng()
				};

				createMap(geocodedLocation, trucksAddress);
			} else {
				swal({
					title: 'Não foi possível encontrar o endereço',
					text: "",
					type: "error"
				});
				$state.go('findlocationalternative');
			}
		}); 
	};

	var createMap = function(geocodedLocation, trucksAddress) {
		var mapCenter = new google.maps.LatLng(geocodedLocation.lat, geocodedLocation.lng);
		
		// Create mapobtions object to define properties
		var mapOptions = {
			zoom: 14,
			center: mapCenter,
			streetViewControl: false,
			mapTypeControl: false,
			disableDoubleClickZoom: true
		};

		// Create the map
		map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

		// Create an marker for user current location
		createMarker(map, mapCenter, 'Seu endereço', 'user');

		var isSimulation = JSON.parse(localStorageService.get('userSession')).isSimulation;

		if (isSimulation) {
			for (var i = 0; i <= 4; i++) {
				var randomLat = geocodedLocation.lat + UtilService.getRandomNumber(-0.02, 0.02);
				var randomLng = geocodedLocation.lng + UtilService.getRandomNumber(-0.02, 0.02);
				
				// Adding a new marker for the object
				createMarker(map, new google.maps.LatLng(randomLat, randomLng), 'Truck Simulado', 'truck');
			}
		} else {
			// Loop through trucks and add them into the map
			for (var i = 0; i < trucksAddress.length; i++) {
				// Current object
				var currentAddress = trucksAddress[i];

				// Adding a new marker for the object
				createMarker(map, new google.maps.LatLng(currentAddress.latitude, currentAddress.longitude), currentAddress.title, 'truck');
			}
		}

		var geoLocationControl = new klokantech.GeolocationControl(map, 16);
	};

	var createMarker = function(map, point, title, markerType) {
		var iconPath;

		if (markerType == "user") {
			iconPath = "img/user_ico_maps.png"; 
		} else {
			iconPath = "img/truck_ico_maps.png";
		}

		var marker = new google.maps.Marker({
			position: point,
			map: map,
			title: title,
			icon: iconPath
		});
		marker.setMap(map);
	};
}]);
