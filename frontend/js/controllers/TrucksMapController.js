foundtruck.controller('TrucksMapController', ['$scope', '$uibModal', 'TrucksService', 'localStorageService', '$state', 'UtilService', function($scope, $uibModal, TrucksService, localStorageService, $state, UtilService) {
	this.loadMap = function() {
		var addressTypeFlag = localStorageService.get('addressTypeFlag');
		var simulation = localStorageService.get('simulation');

		if (addressTypeFlag == 'findlocation') {
			var geocodedAddress = JSON.parse(localStorageService.get('geocodedAddress'));

			if (simulation) {
				var trucksAddress = _simulateTrucksAddress(geocodedAddress, 5);
				createMap(geocodedAddress, trucksAddress);
			} else {
				/* If address was created on findme button it goes directly to create map function */
				TrucksService.loadTrucks()
				.success(function(response) {
					if(response['error']) {
						swal({
							title: 'Não foi possível carregar os food trucks.',
							text: "",
							type: "error",
						});
						$state.go('findlocation');
					}else{
						var trucksAddress =  response['data'];
						createMap(geocodedAddress, trucksAddress);
					}
				});
			}
		} else if (addressTypeFlag == 'alternative') {
			var userLocation = JSON.parse(localStorageService.get('address'));
			
			if (simulation) {
				geocodeUserLocation(userLocation);
			} else {
				TrucksService.loadTrucks()
				.success(function(trucksAddress) {
					if(response['error'] && !simulation){
						swal({
							title: 'Não foi possível carregar os food trucks.',
							text: "",
							type: "error"
						});
						$state.go('findlocation');
					}else{
						var trucksAddress =  response['data'];
						geocodeUserLocation(userLocation, trucksAddress);
					}
				});
			}
		}
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

				if (!trucksAddress) {
					var trucksAddress = _simulateTrucksAddress(geocodedLocation, 4);
				}
				createMap(geocodedLocation, trucksAddress)
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

	var _simulateTrucksAddress = function(geocodedAddress, qtty) {
		var trucksAddress = [];
		for (var i = 0; i < qtty; i++) {
			var currentAddress = {};
			currentAddress.latitude = geocodedAddress.lat + UtilService.getRandomNumber(-0.02, 0.02);
			currentAddress.longitude = geocodedAddress.lng + UtilService.getRandomNumber(-0.02, 0.02);
			
			// Adding a new marker for the object
			currentAddress.truckType = parseInt(UtilService.getRandomNumber(1, 8));

			trucksAddress.push(currentAddress);
		}
		return trucksAddress;
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

		// Loop through trucks and add them into the map
		for (var i = 0; i < trucksAddress.length; i++) {
			// Current object
			var currentAddress = trucksAddress[i];

			// Adding a new marker for the object
			createMarker(map, new google.maps.LatLng(currentAddress.latitude, currentAddress.longitude), currentAddress.title, currentAddress.truckType);
		}

		var geoLocationControl = new klokantech.GeolocationControl(map, 16);
	};

	var createMarker = function(map, point, title, markerType) {
		var iconPath;
		/* Trucks subtitle
		1 - Chinese (black)
		2 - Regional food (blue)
		3 - Vegan (green)	
		4 - Pasta (light-yellow)
		5 - Hot-dog (red)
		6 - Sweets (pink)
		7 - Barbecue (brown)
		8 - Pizza (yellow)
		*/
		switch (markerType) {
			case 0:
				iconPath = "img/markers/orange.png";
				break;
			case 1:
				iconPath = "img/markers/japa.png";
				break;
			case 2:
				iconPath = "img/markers/hamburger.png";
				break;
			case 3:
				iconPath = "img/markers/green.png";
				break;
			case 4:
				iconPath = "img/markers/pasta.png";
				break;
			case 5:
				iconPath = "img/markers/hotdog.png";
				break;
			case 6:
				iconPath = "img/markers/sweet.png";
				break;
			case 7:
				iconPath = "img/markers/barbecue.png";
				break;
			case 8:
				iconPath = "img/markers/pizza.png";
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

		// Adding marker events listeners
		marker.addListener('click', function() {
			// Set selected hydrant and opens modal
			TrucksService.selectedTruck = {
				'title': title,
				'markerType': markerType
			};

			$uibModal.open({
				animation: true,
				templateUrl: 'custom-templates/truck-details.html',
				controller: 'ModalController',
				size: 'md'
			});
		});
	};
}]);