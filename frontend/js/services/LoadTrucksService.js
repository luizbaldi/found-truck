foundtruck.factory('LoadTrucksService', function($http) {
	var httpRequest = $http.get('https://api.myjson.com/bins/5byaj')
		.success(function(data) {
			return data;
		})
		.error(function(error) {
			return error;
		});

	return httpRequest;
});