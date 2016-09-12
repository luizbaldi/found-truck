foundtruck.factory('LoadTrucksService', function($http) {
	var httpRequest = $http.get('json/trucksAddress.json')
		.success(function(data) {
			return data;
		})
		.error(function(error) {
			return error;
		});

	return httpRequest;
});