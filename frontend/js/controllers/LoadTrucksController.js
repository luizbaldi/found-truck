foundtruck.controller('LoadTrucksController', ['$scope', 'LoadTrucksService', 'localStorageService', '$state', 'UtilService', '$uibModal', function($scope, LoadTrucksService, localStorageService, $state, UtilService, $uibModal) {
	$scope.loadMap = function() {
		var addressTypeFlag = localStorageService.get('addressTypeFlag');

		if (addressTypeFlag == 'findlocation') {
			var geocodedAddress = JSON.parse(localStorageService.get('geocodedAddress'));

			/* If address was created on findme button it goes directly to create map function */
			LoadTrucksService.success(function(response) {
				if(response['error']){
					swal({
						title: 'Não foi possível carregar os food trucks.',
						text: "",
						type: "error"
					});
				}else{
					var trucksAddress =  response['data'];
					createMap(geocodedAddress, trucksAddress);
				}
			});
		} else if (addressTypeFlag == 'alternative') {
			var userLocation = JSON.parse(localStorageService.get('address'));
			
			LoadTrucksService.success(function(trucksAddress) {
				if(response['error']){
					swal({
						title: 'Não foi possível carregar os food trucks.',
						text: "",
						type: "error"
					});
				}else{
					var trucksAddress =  response['data'];
					geocodeUserLocation(userLocation, trucksAddress);
				}
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
		createMarker(map, mapCenter, 'Seu endereço', 0);

		var simulation = localStorageService.get('simulation');

		if (simulation) {
			for (var i = 0; i <= 4; i++) {
				var randomLat = geocodedLocation.lat + UtilService.getRandomNumber(-0.02, 0.02);
				var randomLng = geocodedLocation.lng + UtilService.getRandomNumber(-0.02, 0.02);
				
				// Adding a new marker for the object
				var truckType = Math.floor(Math.random() * (5 - 1) + 1) + 1;
				createMarker(map, new google.maps.LatLng(randomLat, randomLng), 'Truck Simulado', truckType);
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
		/* Trucks subtitle
		1 - Chinese (black)
		2 - Regional food (blue)
		3 - Vegan (green)	
		4 - Pasta (light-blue)
		5 - Hot-dog (red)
		*/
		switch (markerType) {
			case 0:
				iconPath = "img/markers/purple.png";
				break;
			case 1:
				iconPath = "img/markers/black.png";
				break;
			case 2:
				iconPath = "img/markers/blue.png";
				break;
			case 3:
				iconPath = "img/markers/vegan.png";
				break;
			case 4:
				iconPath = "img/markers/light-blue.png";
				break;
			case 5:
				iconPath = "img/markers/red.png";
				break;
			default:
				iconPath = "img/markers/orange.png";
				break;
		}

		var marker = new google.maps.Marker({
			position: point,
			map: map,
			title: title,
			icon: iconPath
		});
		marker.setMap(map);
	};

	$scope.openSubtitle = function() {
		$uibModal.open({
			templateUrl: 'custom-templates/markers-subtitle.html',
			controller: 'ModalController',
			size: 'lg'
	    });
	};
}]);
